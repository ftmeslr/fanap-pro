/* eslint-disable no-unused-vars */
import { AxiosRequestConfig, AxiosResponse } from "axios";
/* eslint-disable no-unused-vars */

export type ILogoutType = "MAIN";
export type ITokenType = undefined;

export interface IApi {
  get: <T>(
    url: string,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<T>>;
  delete: <T>(
    url: string,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<T>>;
  post: <T>(
    url: string,
    body: unknown,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<T>>;
  patch: <T>(
    url: string,
    body: unknown,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<T>>;
  put: <T>(
    url: string,
    body: unknown,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<T>>;
  defaults: unknown;
}

export interface responseRefresh {
  data: {
    access: string;
  };
}
