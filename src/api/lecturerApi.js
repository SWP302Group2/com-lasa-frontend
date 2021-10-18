import { GET_LECTURER_API } from "../utils/constant";
import axiosClient from "./axiosClient";


const lecturerApi = {
    getLecturers: (onSuccess, onFailure) => {
        const url = GET_LECTURER_API;
        return axiosClient.get(url)
            .then(onSuccess)
            .catch(response => {
                const status = response?.data?.status || response?.status;
                const message = response?.data?.message || response?.message;
                return onFailure(response, status, message);
            });
    },
    getAllLecturers: (onSuccess, onFailure) => {
        const url = GET_LECTURER_API + "?paging=false";
        return axiosClient.get(url)
            .then(onSuccess)
            .catch(response => {
                const status = response?.data?.status || response?.status;
                const message = response?.data?.message || response?.message;
                return onFailure(response, status, message);
            });
    }
}

export default lecturerApi;