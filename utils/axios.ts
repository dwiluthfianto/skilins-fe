import axios from "axios";
import Cookies from "js-cookie";

// Buat instance axios
const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const accessToken = Cookies.get("accessToken");
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await axios.post(
          "http://localhost:8000/api/v1/auth/refresh",
          {},
          { withCredentials: true }
        );

        // Simpan access token baru ke cookie
        Cookies.set("accessToken", data.accessToken);

        // Set Authorization header dengan token baru
        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;

        // Ulangi request yang gagal
        return axios(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed", refreshError);
        // Redirect ke login jika refresh token gagal
      }
    }
    return Promise.reject(error);
  }
);

export default api;
