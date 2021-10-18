import axios from "axios";
import { GET_SLOT_API, PRODUCT_BASE_URL } from "../utils/constant";
import axiosClient from "./axiosClient";
import queryString from "query-string";

const slotApi = {
    getSlots: (onSuccess, onFailure) => {
        const url = GET_SLOT_API;
        return axiosClient.get(url)
            .then(onSuccess)
            .catch(response => {
                const status = response?.data?.status || response?.status;
                const message = response?.data?.message || response?.message;
                return onFailure(response, status, message);
            });
    },

    searchAllSlots: (searchCriteria, onSuccess, onFailure) => {
        let baseUrl = GET_SLOT_API + "?paging=false";
        const header = {
            baseURL: PRODUCT_BASE_URL,
            headers: {
                "Content-Type": "application/json",
            },
            paramsSerializer: params => queryString.stringify(params),
        };

        //Add time start and time end of slot
        const date = new Date();
        const timeStart = date.toISOString().split(".")[0];
        date.setDate(date.getDate() + searchCriteria.quantity * searchCriteria.unit);
        const timeEnd = date.toISOString().split(".")[0];

        baseUrl += `&timeStart=${timeStart}&timeEnd=${timeEnd}`;

        const urlList = [];
        const length = searchCriteria?.lecturers?.length;

        if (length === 0) {
            urlList.push(baseUrl);
        }
        if (length > 0) {
            let index = 0;
            do {
                const piece = [...searchCriteria.lecturers].slice(index, index + 20);
                let paramString = "";
                piece.forEach(lecturer => {
                    paramString += `&lecId=${lecturer.id}`;
                });
                const pieceUrl = baseUrl + paramString;
                urlList.push(pieceUrl);
                index += 20;
            } while (index < length);
        }

        const requests = [];
        for (let i = 0; i < urlList.length; i++) {
            const request = axios.get(urlList[i], header);
            requests.push(request);
        }

        axios.all(requests)
            .then(axios.spread((...responses) => {
                let resultArray = [];
                console.log(responses);
                responses.forEach(response => resultArray = resultArray.concat(response.data));
                return resultArray;
            }))
            .then(onSuccess)
            .catch(onFailure);
    }
}

export default slotApi;