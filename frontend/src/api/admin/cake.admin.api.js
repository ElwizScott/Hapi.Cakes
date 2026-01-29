import axios from "axios";
import { API_BASE_URL, handleUnauthorized } from "../http";

const adminApi = axios.create({
  baseURL: `${API_BASE_URL}/api/admin`,
  withCredentials: true,
});

adminApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401) {
      await handleUnauthorized();
    }
    return Promise.reject(error);
  }
);

export default adminApi;
