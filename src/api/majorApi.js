import { GET_MAJOR_API, GET_MAJOR_WITH_TOPICS_API } from "../utils/constant";
import axiosClient from "./axiosClient";



const majorApi = {
    getMajors: (onSuccess, onFailure) => {
        const url = GET_MAJOR_API;
        return axiosClient.get(url)
            .then(onSuccess)
            .catch(response => {
                const status = response?.data?.status || response?.status;
                const message = response?.data?.message || response?.message;
                return onFailure(response, status, message);
            });
    },

    getMajorsWithTopics: (onSuccess, onFailure) => {
        const url = GET_MAJOR_WITH_TOPICS_API;
        return axiosClient.get(url)
            .then(onSuccess)
            .catch(response => {
                const status = response?.data?.status || response?.status;
                const message = response?.data?.message || response?.message;
                return onFailure(response, status, message);
            });
    }
}

export default majorApi;