import axios from "axios";
import { DEVELOP_BASE_URL } from "../utils/constant";
import queryString from "query-string";

const axiosClient = axios.create({
    baseURL: DEVELOP_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    paramsSerializer: params => queryString.stringify(params),
    //production use origin: amazon E2 // updateing
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
