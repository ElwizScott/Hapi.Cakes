import axios from "axios";
import { API_BASE_URL } from "../http";

const PUBLIC_API_BASE_URL = `${API_BASE_URL}/api/public`;

export const fetchCakes = async (category) => {
  const res = await axios.get(`${PUBLIC_API_BASE_URL}/cakes`, {
    params: category ? { category } : undefined,
  });
  return res.data;
};

export const fetchCakeFeedbackImages = async (cakeId) => {
  if (!cakeId) return [];
  const res = await axios.get(`${PUBLIC_API_BASE_URL}/cakes/${cakeId}/feedback-images`);
  return res.data;
};
