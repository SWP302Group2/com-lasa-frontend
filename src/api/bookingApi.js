import { BOOKING_REQUEST_API } from "../utils/constant";
import storageTools from "../utils/storageTools";
import axiosClient from "./axiosClient";
import { paramsTools } from "./paramsTools";


const bookingApi = {
    getBookings: (onSuccess, onFailure) => {
        const url = BOOKING_REQUEST_API;
        const accessToken = storageTools.getAccessToken();
        const params = {
            headers: {
                Authorization: accessToken,
            }
        };
        return axiosClient.get(url, params)
            .then(onSuccess)
            .catch(response => {
                const status = response?.data?.status || response?.status;
                const message = response?.data?.message || response?.message;
                return onFailure(response, status, message);
            });;
    },

    getBookingsWithPaging: (pageIndex, onSuccess, onFailure) => {
        const paging = `paging=true`;
        const pageNum = `page=${pageIndex || 0}`;
        const withStudent = `getStudent=true`;

        const apiUrl = BOOKING_REQUEST_API + `?${paging}&${pageNum}&${withStudent}`
        const params = paramsTools.getParamsWithAccessToken();

        return axiosClient.get(apiUrl, params)
            .then(onSuccess)
            .catch(response => {
                const status = response?.data?.status || response?.status;
                const message = response?.data?.message || response?.message;
                return onFailure(response, status, message);
            });
    },

    getCurrentUserBookingsWithoutPaging: (userId, pageIndex, onSuccess, onFailure) => {
        const paging = `paging=false`;
        const pageNum = `page=${pageIndex || 0}`;
        const withStudent = `getStudent=true`;
        const studentId = `studentId=${userId}`;

        const apiUrl = BOOKING_REQUEST_API + `?${paging}&${pageNum}&${withStudent}&${studentId}`;
        const params = paramsTools.getParamsWithAccessToken();

        return axiosClient.get(apiUrl, params)
            .then(onSuccess)
            .catch(response => {
                const status = response?.data?.status || response?.status;
                const message = response?.data?.message || response?.message;
                return onFailure(response, status, message);
            });
    },

    createBooking: (createTime, slotId, topicId, questions, title, onSuccess, onFailure) => {
        const url = BOOKING_REQUEST_API
        const params = paramsTools.getParamsWithAccessToken();

        const data = {
            slotId: slotId.toString(),
            topicId: topicId.toString(),
            questions,
            title,
            createTime
        };

        console.log("Create booking data");
        console.log(data);

        return axiosClient.post(url, data, params)
            .then(onSuccess)
            .catch(response => {
                const status = response?.data?.status || response?.status;
                const message = response?.data?.message || response?.message;
                return onFailure(response, status, message);
            });
    }


}

export default bookingApi;