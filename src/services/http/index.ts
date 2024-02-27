import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { API_URL_V1 } from '@/utils/constants';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const http: AxiosInstance = axios.create({
  baseURL: API_URL_V1,
  timeout: 30000 * 2,
});

async function getAccessTokenUsingRefreshToken(): Promise<string> {
  // Implemet logic to get new access token using refresh token
  return '';
}

let isRefreshing = false;
let failedQueue: ((token: string) => void)[] = [];

http.interceptors.request.use(async (config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem(
    'ACCESS_TOKEN'
  )}`;
  return config;
});

http.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest: CustomAxiosRequestConfig = error.config;

    originalRequest.headers = {
      ...originalRequest.headers,
    };

    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        try {
          const accessToken = await new Promise<string>((resolve) => {
            failedQueue.push((newAccessToken) => {
              resolve(newAccessToken);
            });
          });

          originalRequest.headers.authorization = `Bearer ${accessToken}`;
          return axios(originalRequest);
        } catch (error) {
          // If getting a new access token using refresh token also fails, show an alert message
          console.log('Failed to refresh access token using refresh token');
          // You can show an alert message here
        }
      } else {
        isRefreshing = true;
        originalRequest._retry = true;

        const newAccessToken = await getAccessTokenUsingRefreshToken();

        isRefreshing = false;
        localStorage.setItem('ACCESS_TOKEN', newAccessToken);

        originalRequest.headers.authorization = `Bearer ${newAccessToken}`;
        failedQueue.forEach((prom) => prom(newAccessToken));
        failedQueue = [];

        return axios(originalRequest);
      }
    }

    return Promise.reject(error.response);
  }
);

export default http;
