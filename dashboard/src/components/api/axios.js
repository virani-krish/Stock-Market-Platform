import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3002",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.replace("http://localhost:3000/login");
    }
    return Promise.reject(error);
  }
);

export default api;
