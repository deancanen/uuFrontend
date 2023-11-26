import axios, { AxiosError } from "axios";

axios.defaults.baseURL = process.env.MOCK
  ? process.env.MOCK_API
  : process.env.REAL_API;

export const API = axios.create({
  baseURL: "/api",
});

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      throw axiosError;
    }
    return Promise.reject(error);
  }
);
