import axios from "axios";
import { createRef } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const axiosClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

type LoadingBar = {
  continuousStart: (startingValue?: number, refreshRate?: number) => void;
  staticStart: (startingValue?: number) => void;
  complete: () => void;
};
export const loadingBarRef = createRef<LoadingBar>();

const accessToken = localStorage.getItem("access_token");
axiosClient.interceptors.request.use(
  function (config) {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    if (loadingBarRef.current) {
      loadingBarRef.current.continuousStart();
    }
    return config;
  },
  function (error) {
    if (loadingBarRef.current) {
      loadingBarRef.current.complete();
    }
    return Promise.reject(error);
  },
);
axiosClient.interceptors.response.use(
  function (response) {
    if (loadingBarRef.current) {
      loadingBarRef.current.complete();
    }
    return response && response.data ? response.data : response;
  },
  function (error) {
    if (loadingBarRef.current) {
      loadingBarRef.current.complete();
    }
    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  },
);

export default axiosClient;
