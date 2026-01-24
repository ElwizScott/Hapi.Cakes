import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/public";

export const fetchCakes = async (category) => {
  const res = await axios.get(`${API_BASE_URL}/cakes`, {
    params: category ? { category } : undefined,
  });
  return res.data;
};
