import { GET_MAJOR_API } from "../utils/constant";
import axiosClient from "./axiosClient";
import { paramsTools } from "./paramsTools";

const majorApi = {
  getMajorsWithoutPaging: (onSuccess, onFailure) => {
    const noPaging = `paging=false`;
    const apiUrl = GET_MAJOR_API + `?${noPaging}`;

    return axiosClient
      .get(apiUrl)
      .then(onSuccess)
      .catch((response) => {
        const status = response?.data?.status || response?.status;
        const message = response?.data?.message || response?.message;
        return onFailure(response, status, message);
      });
  },

  getMajorsWithTopicsWithoutPaging: (onSuccess, onFailure) => {
    const paging = `paging=false`;
    const withTopic = `getTopic=true`;

    const apiUrl = GET_MAJOR_API + `?${paging}&${withTopic}`;

    return axiosClient
      .get(apiUrl)
      .then(onSuccess)
      .catch((response) => {
        const status = response?.data?.status || response?.status;
        const message = response?.data?.message || response?.message;
        return onFailure(response, status, message);
      });
  },

  getMajorsWithTopicsWithPaging: (pageIndex, onSuccess, onFailure) => {
    const paging = `paging=true`;
    const pageNum = `page=${pageIndex || 0}`;
    const withTopic = `getTopic=true`;

    const apiUrl = GET_MAJOR_API + `?${paging}&${pageNum}&${withTopic}`;

    return axiosClient
      .get(apiUrl)
      .then(onSuccess)
      .catch((response) => {
        const status = response?.data?.status || response?.status;
        const message = response?.data?.message || response?.message;
        return onFailure(response, status, message);
      });
  },

  addNewMajor: (onSuccess, onFailure, majorCode, name, description) => {
    const url = GET_MAJOR_API;
    const data = [
      {
        id: majorCode,
        name,
        description,
      },
    ];
    const params = paramsTools.getParamsWithAccessToken();

    return axiosClient
      .post(url, data, params)
      .then(onSuccess)
      .catch((response) => {
        const status = response?.data?.status || response?.status;
        const message = response?.data?.message || response?.message;
        return onFailure(response, status, message);
      });
  },
};

export default majorApi;
