import axios from "axios";
import { DEVELOP_BASE_URL, GET_SLOT_API } from "../utils/constant";
import axiosClient from "./axiosClient";
import storageTools from "../utils/storageTools";
import { paramsTools } from "./paramsTools";
import dateTools from "../utils/dateTools";

const BASE_URL = DEVELOP_BASE_URL;

const slotApi = {
    getSlots: (onSuccess, onFailure) => {
        const url = GET_SLOT_API;
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
            });
    },

    getSlotsBySlotIdWithoutPaging: (slotIds, onSuccess, onFailure) => {
        const noPaging = `paging=false`;
        const withLecturer = `getLecturer=true`;
        const withTopic = `getTopic=true`;

        const apiUrl = GET_SLOT_API + `?${noPaging}&${withLecturer}&${withTopic}`;
        const params = paramsTools.getParamsWithAccessToken();

        const requests = [];
        const length = slotIds.length;
        if (length === 0) {
            requests.push(axios.get(apiUrl, params));
        }
        if (length > 0) {
            let index = 0;
            do {
                const piece = [...slotIds].slice(index, index + 20);
                let slotIdParamString = "";
                piece.forEach(slotId => slotIdParamString += `&slotId=${slotId}`);

                requests.push(axios.get(apiUrl + slotIdParamString, params));
                index += 20;
            } while (index < length);
        }

        axios.all(requests)
            .then(axios.spread((...responses) => {
                let resultArray = [];
                responses.forEach(response => resultArray = resultArray.concat(response.data));
                return resultArray;
            }))
            .then(onSuccess)
            .catch(onFailure);
    },

    getCurrentUserSlot: (userId, onSuccess, onFailure) => {
        const noPaging = "paging=false";
        const lecturerId = `lecId=${userId}`;
        const isGetTopic = `getTopic=true`;
        const sortByStartTime = "sortBy=timeStart"

        const apiUrl = GET_SLOT_API + `?${noPaging}&${lecturerId}&${isGetTopic}&${sortByStartTime}`;
        const params = paramsTools.getParamsWithAccessToken();

        return axiosClient.get(apiUrl, params)
            .then(onSuccess)
            .catch(response => {
                const status = response?.data?.status || response?.status;
                const message = response?.data?.message || response?.message;
                return onFailure(response, status, message);
            });
    },

    getAllSlotsWithPaging: (pageIndex, onSuccess, onFailure) => {
        const paging = `paging=true`;
        const pageNum = `page=${pageIndex || 0}`;
        const withLecturer = `getLecturer=true`;
        const sortByStartTime = "sortBy=timeStart"

        const apiUrl = GET_SLOT_API + `?${paging}&${pageNum}&${withLecturer}&${sortByStartTime}`;
        const params = paramsTools.getParamsWithAccessToken();

        return axiosClient.get(apiUrl, params)
            .then(onSuccess)
            .catch(response => {
                const status = response?.data?.status || response?.status;
                const message = response?.data?.message || response?.message;
                return onFailure(response, status, message);
            });
    },

    searchAllSlotsWithoutPaging: (searchCriteria, onSuccess, onFailure) => {
        let apiUrl = GET_SLOT_API + "?paging=false";
        const params = paramsTools.getParamsWithAccessToken();

        //Add time start and time end of slot
        const { timeStart, timeEnd } = dateTools.getTimeStartAndTimeEndInISOFormat(searchCriteria.days);
        apiUrl += `&timeStart=${timeStart}&timeEnd=${timeEnd}`;

        const requests = [];
        const length = searchCriteria.lecturers?.length || 0;
        if (length === 0) {
            requests.push(axios.get(apiUrl, params));
        }
        if (length > 0) {
            let index = 0;
            do {
                const piece = [...searchCriteria.lecturers].slice(index, index + 20);
                let lecturerIdParamString = "";
                piece.forEach(lecturer => lecturerIdParamString += `&lecId=${lecturer.id}`);

                requests.push(axios.get(apiUrl + lecturerIdParamString, params));
                index += 20;
            } while (index < length);
        }

        axios.all(requests)
            .then(axios.spread((...responses) => {
                let resultArray = [];
                responses.forEach(response => resultArray = resultArray.concat(response.data));
                return resultArray;
            }))
            .then(onSuccess)
            .catch(onFailure);
    },

    searchAllSlotsWithPaging: (pageIndex, searchCriteria, onSuccess, onFailure, numOfElements) => {
        const paging = `paging=true`;
        const size = numOfElements > 0 ? numOfElements : 10;
        const pageNum = `page=${pageIndex}`;
        const withLecturer = `getLecturer=true`;
        const withTopic = `getTopic=true`;
        const sortByStartTime = "sortBy=timeStart";
        const { timeStart, timeEnd } = dateTools.getTimeStartAndTimeEndInISOFormat(searchCriteria.days);

        let lecturerIdParamString = "";
        searchCriteria.lecturers?.forEach(lecturer => lecturerIdParamString += `&lecId=${lecturer.id}`);
        let topicIdParamString = "";
        searchCriteria.topics?.forEach(topic => topicIdParamString += `&topicId=${topic.id}`);

        const apiUrl = GET_SLOT_API + `?${paging}&${pageNum}&${withLecturer}&${withTopic}&${sortByStartTime}`
            + `&timeStart=${timeStart}&timeEnd=${timeEnd}&size=${size}` + lecturerIdParamString + topicIdParamString;

        const params = {
            baseURL: BASE_URL,
            headers: {
                "Content-Type": "application/json",
                uuid: searchCriteria.uuid,
                Authorization: storageTools.getAccessToken()
            }
        }

        return axios.get(apiUrl, params)
            .then(response => onSuccess(response.data, response.headers, response))
            .catch(response => {
                const status = response?.data?.status || response?.status;
                const message = response?.data?.message || response?.message;
                return onFailure(response, status, message);
            });
    },

    createSlot: (timeStart, period, topics, onSuccess, onFailure) => {
        const url = GET_SLOT_API;
        const params = paramsTools.getParamsWithAccessToken();

        let timeEnd = new Date(timeStart);
        timeEnd.setMinutes(timeEnd.getMinutes() + period);
        timeEnd = dateTools.convertDateToISOStringWithTimeZoneOffset(timeEnd);
        const data = {
            timeStart,
            timeEnd: timeEnd,
            topics: topics.map(topic => topic.id)
        };

        console.log("Create slot data");
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

export default slotApi;