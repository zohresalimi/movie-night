import axios from "axios";

const apiKey = process.env.REACT_APP_API_Key;

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  config.params = {
    api_key: apiKey,
    ...config.params,
  };
  return config;
});

export default axiosInstance;
