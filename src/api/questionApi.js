import axiosClient from "./axiosClient";
import storageTools from "../"

const questionApi = {
    getQuestions: (onSuccess, onFailure) => {
        const url = "/questions";
        const accessToken = storageTools.getAccessToken();

        const params = {
            headers: {
                Authorization: accessToken,
            }
        };
        return axiosClient.get(url, params);
    }


}

export default questionApi;