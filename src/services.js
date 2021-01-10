/**
 * Another approach to use axios in our React app
 * was to create a custom hook (ex. `useAxios`, ...)
 */
import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  config.params = {
    api_key: apiKey,
    ...config.params,
  };
  return config;
});

export default axiosInstance;
