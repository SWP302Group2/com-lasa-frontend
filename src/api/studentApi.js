import { GET_STUDENT_API } from "../utils/constant";
import axiosClient from "./axiosClient";
import { paramsTools } from "./paramsTools";


const studentApi = {
    getStudentsWithPaging: (pageIndex, onSuccess, onFailure) => {
        const paging = `paging=true`;
        const pageNum = `page=${pageIndex || 0}`;

        const apiUrl = GET_STUDENT_API + `?${paging}&${pageNum}`;
        const params = paramsTools.getParamsWithAccessToken();

        return axiosClient.get(apiUrl, params)
            .then(onSuccess)
            .catch(response => {
                const status = response?.data?.status || response?.status;
                const message = response?.data?.message || response?.message;
                return onFailure(response, status, message);
            });
    }
}

export default studentApi;