import { ADMIN_API_URL } from "../utils/constant";
import dateTools from "../utils/dateTools";
import axiosClient from "./axiosClient";
import { paramsTools } from "./paramsTools";

const adminApi = {
  updatePassword: (onSuccess, onFailure, id, newPassword) => {
    const apiUrl = ADMIN_API_URL;
    const params = paramsTools.getParamsWithAccessToken();
    const data = {
      id,
      password: newPassword,
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

  updateName: (onSuccess, onFailure, id, newName) => {
    const apiUrl = ADMIN_API_URL;
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
    const apiUrl = ADMIN_API_URL;
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
    const apiUrl = ADMIN_API_URL;
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
    const apiUrl = ADMIN_API_URL;
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
    const apiUrl = ADMIN_API_URL;
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
    const apiUrl = ADMIN_API_URL;
    const params = paramsTools.getParamsWithAccessToken();
    const data = {
      id,
      major: newMajor,
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
    const apiUrl = ADMIN_API_URL;
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

  updateEmail: (onSuccess, onFailure, id, newEmail) => {
    const apiUrl = ADMIN_API_URL;
    const params = paramsTools.getParamsWithAccessToken();
    const data = {
      id,
      email: newEmail,
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

export default adminApi;
