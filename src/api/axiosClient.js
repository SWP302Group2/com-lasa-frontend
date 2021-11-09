import axios from "axios";
import queryString from "query-string";
import { BASE_URL } from "../utils/constant";

const USING_BASE_URL = BASE_URL;

const axiosClient = axios.create({
    baseURL: USING_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => Promise.reject(error?.response || error)
);

export default axiosClient;
