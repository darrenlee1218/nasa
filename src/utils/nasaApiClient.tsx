import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { NASA_MEDIA_LIBRARY_API_ROOT } from "constants/nasaMediaLibrary";

export interface NasaApiClient extends AxiosInstance {
  get<T, D = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
}

const commonAxiosConfig: AxiosRequestConfig = {
  baseURL: NASA_MEDIA_LIBRARY_API_ROOT,
};

export const nasaApiClient: NasaApiClient = axios.create(commonAxiosConfig);
