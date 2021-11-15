import { GET_STUDENT_API } from "../utils/constant";
import dateTools from "../utils/dateTools";
import axiosClient from "./axiosClient";
import { paramsTools } from "./paramsTools";

const studentApi = {
  getStudentsWithPaging: (pageIndex, onSuccess, onFailure) => {
    const paging = `paging=true`;
    const pageNum = `page=${pageIndex || 0}`;

    const apiUrl = GET_STUDENT_API + `?${paging}&${pageNum}`;
    const params = paramsTools.getParamsWithAccessToken();

    return axiosClient
      .get(apiUrl, params)
      .then(onSuccess)
      .catch((response) => {
        const status = response?.data?.status || response?.status;
        const message = response?.data?.message || response?.message;
        return onFailure(response, status, message);
      });
  },

  updateName: (onSuccess, onFailure, id, newName) => {
    const apiUrl = GET_STUDENT_API;
    const params = paramsTools.getParamsWithAccessToken();
    const data = {
      id,
      name: newName,
    };
    return axiosClient
      .patch(apiUrl, data, params)
      .then(onSuccess)
      .catch((response) => {
        const status = response?.data?.status || response?.status;
        const message = response?.data?.message || response?.message;
        return onFailure(response, status, message);
      });
  },

  updateAddress: (onSuccess, onFailure, id, newAddress) => {
    const apiUrl = GET_STUDENT_API;
    const params = paramsTools.getParamsWithAccessToken();
    const data = {
      id,
      address: newAddress,
    };
    return axiosClient
      .patch(apiUrl, data, params)
      .then(onSuccess)
      .catch((response) => {
        const status = response?.data?.status || response?.status;
        const message = response?.data?.message || response?.message;
        return onFailure(response, status, message);
      });
  },

  updateAvatarUrl: (onSuccess, onFailure, id, newAvatarUrl) => {
    const apiUrl = GET_STUDENT_API;
    const params = paramsTools.getParamsWithAccessToken();
    const data = {
      id,
      avatarUrl: newAvatarUrl,
    };
    return axiosClient
      .patch(apiUrl, data, params)
      .then(onSuccess)
      .catch((response) => {
        const status = response?.data?.status || response?.status;
        const message = response?.data?.message || response?.message;
        return onFailure(response, status, message);
      });
  },

  updateBirthday: (onSuccess, onFailure, id, newBirthday) => {
    const apiUrl = GET_STUDENT_API;
    const params = paramsTools.getParamsWithAccessToken();
    const data = {
      id,
      birthday: dateTools.convertDateToISOStringWithTimeZoneOffset(
        new Date(newBirthday)
      ),
    };
    return axiosClient
      .patch(apiUrl, data, params)
      .then(onSuccess)
      .catch((response) => {
        const status = response?.data?.status || response?.status;
        const message = response?.data?.message || response?.message;
        return onFailure(response, status, message);
      });
  },

  updateGender: (onSuccess, onFailure, id, newGender) => {
    const apiUrl = GET_STUDENT_API;
    const params = paramsTools.getParamsWithAccessToken();
    const data = {
      id,
      gender: newGender,
    };
    return axiosClient
      .patch(apiUrl, data, params)
      .then(onSuccess)
      .catch((response) => {
        const status = response?.data?.status || response?.status;
        const message = response?.data?.message || response?.message;
        return onFailure(response, status, message);
      });
  },

  updateMajor: (onSuccess, onFailure, id, newMajor) => {
    const apiUrl = GET_STUDENT_API;
    const params = paramsTools.getParamsWithAccessToken();
    const data = {
      id,
      majorId: newMajor,
    };
    return axiosClient
      .patch(apiUrl, data, params)
      .then(onSuccess)
      .catch((response) => {
        const status = response?.data?.status || response?.status;
        const message = response?.data?.message || response?.message;
        return onFailure(response, status, message);
      });
  },

  updateMSSV: (onSuccess, onFailure, id, newMSSV) => {
    const apiUrl = GET_STUDENT_API;
    const params = paramsTools.getParamsWithAccessToken();
    const data = {
      id,
      mssv: newMSSV,
    };
    return axiosClient
      .patch(apiUrl, data, params)
      .then(onSuccess)
      .catch((response) => {
        const status = response?.data?.status || response?.status;
        const message = response?.data?.message || response?.message;
        return onFailure(response, status, message);
      });
  },

  updatePhone: (onSuccess, onFailure, id, newPhone) => {
    const apiUrl = GET_STUDENT_API;
    const params = paramsTools.getParamsWithAccessToken();
    const data = {
      id,
      phone: newPhone,
    };
    return axiosClient
      .patch(apiUrl, data, params)
      .then(onSuccess)
      .catch((response) => {
        const status = response?.data?.status || response?.status;
        const message = response?.data?.message || response?.message;
        return onFailure(response, status, message);
      });
  },
};

export default studentApi;
