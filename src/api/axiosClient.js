import axios from "axios";
import {
    DEVELOP_BASE_URL,
    // PRODUCT_BASE_URL
} from "../utils/constant";
import queryString from "query-string";

// const BASE_URL = PRODUCT_BASE_URL;
const BASE_URL = DEVELOP_BASE_URL;

const axiosClient = axios.create({
    baseURL: BASE_URL,
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
