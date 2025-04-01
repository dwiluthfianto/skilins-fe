import axios, {
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from "axios";
import Cookies from "js-cookie";

// Konstanta
const ACCESS_TOKEN_EXPIRY = Number(process.env.NEXT_PUBLIC_TOKEN_EXPIRY);
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Tipe untuk memperjelas permintaan
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
  _refreshing?: boolean;
}

// Buat instance axios
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 10000, // Tambahkan timeout untuk mencegah permintaan menggantung terlalu lama
});

// Interceptor untuk menambahkan token ke header
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const accessToken = Cookies.get("access_token");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Fungsi untuk me-refresh token
const refreshToken = async (): Promise<string> => {
  try {
    const { data } = await axios.post(
      `${API_URL}/auth/refresh`,
      {},
      { withCredentials: true }
    );
    const newToken = data.data.access_token;
    Cookies.set("access_token", newToken, {
      expires: ACCESS_TOKEN_EXPIRY,
    });
    return newToken;
  } catch (error) {
    console.error("Refresh token failed", error);
    // Opsi: redirect ke halaman login jika refresh gagal
    window.location.href = "/auth/user/login";
    throw error;
  }
};

// Queue untuk menangani permintaan selama token di-refresh
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
  config: ExtendedAxiosRequestConfig;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else if (token) {
      promise.config.headers["Authorization"] = `Bearer ${token}`;
      promise.resolve(axios(promise.config));
    }
  });
  failedQueue = [];
};

// Interceptor respons
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as ExtendedAxiosRequestConfig;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // Cek apakah status error adalah 401 dan permintaan belum diulang
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Jika belum ada proses refresh yang berjalan, mulai proses refresh
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const newToken = await refreshToken();
          isRefreshing = false;
          processQueue(null, newToken);
          return axios(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          processQueue(refreshError as Error);
          return Promise.reject(refreshError);
        }
      } else {
        // Jika proses refresh sedang berjalan, tambahkan permintaan ke antrian
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }
    }

    return Promise.reject(error);
  }
);

export default api;
