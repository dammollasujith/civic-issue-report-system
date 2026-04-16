import axios from "axios";
import { env } from "@/lib/env";

export const http = axios.create({
  baseURL: env.apiBaseUrl,
  withCredentials: true
});

let refreshing: Promise<void> | null = null;

http.interceptors.response.use(
  (r) => r,
  async (error) => {
    const status = error?.response?.status;
    const original = error?.config;
    const isAuthRequest = original?.url?.includes("/api/auth/login") || original?.url?.includes("/api/auth/refresh");

    if (status === 401 && original && !original.__isRetry && !isAuthRequest) {
      original.__isRetry = true;
      refreshing =
        refreshing ??
        http
          .post("/api/auth/refresh")
          .then(() => undefined)
          .catch(() => {
             // If refresh fails, we should probably logout or just let it fail
             return Promise.reject(error);
          })
          .finally(() => {
            refreshing = null;
          });
      try {
        await refreshing;
        return http.request(original);
      } catch (refreshError) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

