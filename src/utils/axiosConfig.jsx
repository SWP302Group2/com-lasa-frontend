import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:8080/",
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:8080",
    "Access-Control-Allow-Credentials": "true",
    "Content-Type": "application/json",
  },
  //production use: amazon E2
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response.data.err)
);

export default axiosInstance;
