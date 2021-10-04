import axios from "axios";
import Cookies from "universal-cookie/es6";

const cookie = new Cookies();
const tokenValue = cookie.get("access_token");
const tokenName = "Authorization";

const axiosWithTokenInstance = axios.create({
  baseURL: "http://localhost:8080/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    [tokenName]: tokenValue,
  },
  // "Content-Type": "application/x-www-form-urlencoded",
  //production use origin: amazon E2 // updateing
});

axiosWithTokenInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response)
);

export default axiosWithTokenInstance;
