import axios from "axios";
import { API_BASE_URL } from "../http";

const PUBLIC_API_BASE_URL = `${API_BASE_URL}/api/public`;

export const fetchFeedbackImages = async () => {
  const res = await axios.get(`${PUBLIC_API_BASE_URL}/feedback-images`);
  return res.data ?? [];
};
