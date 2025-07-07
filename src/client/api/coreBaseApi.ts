import axiosInstance from "./axiosInstance";
import { AxiosRequestConfig } from "axios";

export class BaseApi {
  protected axios = axiosInstance;

  protected get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.axios.get(url, config).then((res) => res.data.data);
  }

  protected post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.axios.post(url, data, config).then((res) => res.data.data);
  }

  protected put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.axios.put(url, data, config).then((res) => res.data.data);
  }

  protected patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.axios.patch(url, data, config).then((res) => res.data.data);
  }
}
