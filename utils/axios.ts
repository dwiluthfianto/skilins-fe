import axios, { InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

// Buat instance axios
const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  withCredentials: true,
});

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const accessToken = Cookies.get('access_token');
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Cek apakah status error adalah 401 dan permintaan belum diulang
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Tandai permintaan ini sebagai sudah diulang

      // Cek apakah refresh token sedang diproses
      if (!originalRequest._refreshing) {
        originalRequest._refreshing = true; // Tandai bahwa refresh token sedang diproses

        try {
          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
            {},
            { withCredentials: true }
          );

          Cookies.set('access_token', data.data.access_token, {
            expires: 15 / 1440,
          });

          originalRequest.headers[
            'Authorization'
          ] = `Bearer ${data.data.access_token}`;

          // Setelah refresh token berhasil, lakukan permintaan ulang
          return axios(originalRequest);
        } catch (refreshError) {
          console.error('Refresh token failed', refreshError);
        } finally {
          // Reset status refreshing setelah proses selesai
          originalRequest._refreshing = false;
        }
      } else {
        // Jika refresh token sedang diproses, tunggu hingga selesai
        const retryOriginalRequest = new Promise((resolve) => {
          const checkRefresh = setInterval(() => {
            if (!originalRequest._refreshing) {
              clearInterval(checkRefresh);
              resolve(axios(originalRequest)); // Resolve permintaan saat token selesai diperbarui
            }
          }, 100); // Cek setiap 100ms
        });

        return retryOriginalRequest;
      }
    }
    return Promise.reject(error);
  }
);

export default api;
