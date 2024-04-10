import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

import { IApi } from "./api.types";

// Create Axios Instance
const createAxiosInstance = (baseUrl: string): AxiosInstance => {
  const instance = axios.create({
    baseURL: baseUrl,
  });

  return instance;
};

const api = (axios: AxiosInstance): IApi => ({
  get: <T>(url: string, config: AxiosRequestConfig = {}) => {
    return axios.get<T>(url, config);
  },
  delete: <T>(url: string, config: AxiosRequestConfig = {}) => {
    return axios.delete<T>(url, config);
  },
  post: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) => {
    return axios.post<T>(url, body, config);
  },
  patch: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) => {
    return axios.patch<T>(url, body, config);
  },
  put: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) => {
    return axios.put<T>(url, body, config);
  },
  defaults: axios.defaults,
});

// ------------------------------------------------------------

// BASE URLS
const MOCK_BASE_URL = process.env.NEXT_PUBLIC_MOCK_BASE_URL as string;

// ------------------------------------------------------------

// Mihan API
const mockBaseUrl = createAxiosInstance(MOCK_BASE_URL);
export const mockApi = api(mockBaseUrl);
