import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { IApi } from "./services.types";

// Create Axios Instance
export const createAxiosInstance = (baseUrl: string): AxiosInstance => {
  const instance = axios.create({
    baseURL: baseUrl,
  });

  instance.interceptors.response.use(
    async (response: AxiosResponse) => {
      if (response.data.code === 401) {
        const clearCookiesOptions = {
          secure: process.env.NODE_ENV !== "development",
          maxAge: 0,
          path: "/",
        };
        toast.error("لطفا دوباره وارد شوید");
        // Redirecting the user to the landing page

        window.location.href = window.location.origin;
      }
      return response;
    },
    async (err) => {
      const originalConfig = err.config;
      if (originalConfig.url !== "/auth/login") {
        // Access Token was expired
        if (err.response.code === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          toast.error("لطفا دوباره وارد شوید");
          // Redirecting the user to the landing page
          window.location.href = window.location.origin;
        }
      }

      return Promise.reject(err);
    }
  );

  return instance;
};

export class Api implements IApi {
  // eslint-disable-next-line no-unused-vars
  constructor(private readonly axios: AxiosInstance) {}
  get<T>(
    url: string,
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T, any>> {
    return this.axios.get<T>(url, config);
  }
  post<T>(
    url: string,
    body: unknown,
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T, any>> {
    return this.axios.post<T>(url, body, config);
  }
  delete<T>(
    url: string,
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T, any>> {
    return this.axios.delete<T>(url, config);
  }
  put<T>(
    url: string,
    body: unknown,
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T, any>> {
    return this.axios.put<T>(url, body, config);
  }
  patch<T>(
    url: string,
    body: unknown,
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T, any>> {
    return this.axios.patch<T>(url, body, config);
  }

  defaults = this.axios.defaults;
}
