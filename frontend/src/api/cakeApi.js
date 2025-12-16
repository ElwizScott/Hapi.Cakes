import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

export const fetchCakes = async () => {
  const res = await axios.get(`${API_BASE_URL}/cakes`);
  return res.data;
};
