import axios, { AxiosRequestConfig } from "axios";
import {API} from "../config/config.ts"
// Create axios instance
const axiosClient = axios.create({
  baseURL: API.baseURL, // adjust if needed
  headers: {
    "Content-Type": "application/json",
  },
});

// Request middleware: attach token or throw (redirect handled in ProtectedRoute)
axiosClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      if (!config.headers) config.headers = {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response middleware: on 401 remove token and optionally redirect
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const req = error?.config;

    // If this was a preflight OPTIONS (axios might not show OPTIONS here, but protect anyway)
    if (req?.method?.toLowerCase() === "options") {
      return Promise.reject(error);
    }

    // Do not purge token for auth endpoints (login/refresh)
    if (req?.url?.includes("/api/auth/")) {
      return Promise.reject(error);
    }

    if (status === 401) {
      // Optionally check some response body to confirm it is "token invalid" not "CORS" etc.
      // e.g., if (error.response.data?.error === 'Unauthorized' && !req.url.includes('/some-public'))
    //   console.warn(
    //     "401 on",
    //     req?.url,
    //     " — clearing token and redirecting to login"
    //   );
    //   localStorage.removeItem("token");
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
