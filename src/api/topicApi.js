import axiosClient from "./axiosClient";


const topicApi = {
    getTopics: (onSuccess, onFailure) => {
        const url = "/topics";
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