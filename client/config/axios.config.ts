import { Header } from "@/components/Header";
import { useAuthStore } from "@/store/auth.store";
import axios from "axios";
import { error } from "console";
import API_ROUTES from "../../shared/src/api";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: 10000,
});

// Interceptor để thêm header user
api.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (
      originalRequest.url.includes("/auth/signIn") ||
      originalRequest.url.includes("/auth/signUp") ||
      originalRequest.url.includes("/auth/refresh")
    ) {
      return Promise.reject();
    }

    originalRequest._retryCount = originalRequest._retryCount || 0;
    if (error.response?.status === 403 && originalRequest._retryCount < 4) {
       originalRequest._retryCount += 1;
      try {
        const res = await api.post(API_ROUTES.auth.refresh, {
          withCredentials: true,
        });
        const newAccessToken = res.data.accessToken;

        useAuthStore.getState().setAccessToken(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().clearState();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export async function safeRequest<T>(fn: () => Promise<T>) {
  try {
    return {
      success: true,
      data: await fn(),
      error: null,
    };
  } catch (error: any) {
    return {
      success: false,
      data: null,
      error: error?.response?.data || error.message,
    };
  }
}
