import axios from "axios";
import { API_BASE } from "./config";

// Counter to track simultaneous requests
let activeRequests = 0;

const startLoading = () => {
  activeRequests++;
  document.dispatchEvent(new CustomEvent("app:loading", { detail: true }));
};

const stopLoading = () => {
  activeRequests = Math.max(activeRequests - 1, 0);
  if (activeRequests === 0) {
    document.dispatchEvent(new CustomEvent("app:loading", { detail: false }));
  }
};

const axiosInstance = axios.create({
  baseURL: API_BASE + "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    startLoading();
    return config;
  },
  (error) => {
    stopLoading();
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    stopLoading();
    return response;
  },
  (error) => {
    stopLoading();
    return Promise.reject(error);
  }
);

export default axiosInstance;
