import axios from "axios";
import { API_BASE_URL } from "../http";

const PUBLIC_API_BASE_URL = `${API_BASE_URL}/api/public`;

export const fetchCategories = async () => {
  const res = await axios.get(`${PUBLIC_API_BASE_URL}/categories`);
  return res.data;
};
