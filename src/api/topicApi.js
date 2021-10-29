import { GET_TOPIC_API } from "../utils/constant";
import axiosClient from "./axiosClient";


const topicApi = {
    getTopics: (onSuccess, onFailure) => {
        const url = GET_TOPIC_API;
        return axiosClient.get(url)
            .then(onSuccess)
            .catch(response => {
                const status = response?.data?.status || response?.status;
                const message = response?.data?.message || response?.message;
                return onFailure(response, status, message);
            });
    },

    getTopicsNoPaging: (onSuccess, onFailure) => {
        const url = GET_TOPIC_API + "?paging=false";
        return axiosClient.get(url)
            .then(onSuccess)
            .catch(response => {
                const status = response?.data?.status || response?.status;
                const message = response?.data?.message || response?.message;
                return onFailure(response, status, message);
            });
    }
}

export default topicApi;