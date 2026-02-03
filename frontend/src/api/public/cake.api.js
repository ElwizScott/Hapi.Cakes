import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/public";

export const fetchCakes = async (category) => {
  const res = await axios.get(`${API_BASE_URL}/cakes`, {
    params: category ? { category } : undefined,
  });
  return res.data;
};

export const fetchCakeFeedbackImages = async (cakeId) => {
  if (!cakeId) return [];
  const res = await axios.get(`${API_BASE_URL}/cakes/${cakeId}/feedback-images`);
  return res.data;
};
