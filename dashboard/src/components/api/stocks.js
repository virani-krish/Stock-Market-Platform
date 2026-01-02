import api from "./axios"; // your axios instance

export const fetchStocks = async () => {
  const res = await api.get("/stocks");
  return res.data;
};
