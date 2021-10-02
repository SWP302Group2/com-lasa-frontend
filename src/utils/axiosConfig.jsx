import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
  },
  // "Content-Type": "application/x-www-form-urlencoded",
  //production use origin: amazon E2 // updateing
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response)
);

export default axiosInstance;
