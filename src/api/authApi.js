import { ACCESS_TOKEN_NOT_EXIST, CHECK_VALID_ACCESS_TOKEN, CHECK_VALID_SIGN_UP_EMAIL, GET_USER_INFO_API, SIGN_IN_GOOGLE_API, SIGN_IN_LOCAL_API, SIGN_UP_LECTURER_GOOGLE_API, SIGN_UP_STUDENT_GOOGLE_API } from "../utils/constant";
import storageTool from "../utils/storageTools";
import axiosClient from "./axiosClient";
import { paramsTools } from "./paramsTools";

const authApi = {
    signInGoogle: (id_token, onSignin, onFailure) => {
        const url = SIGN_IN_GOOGLE_API;
        const params = { token: id_token };
        axiosClient.post(url, params)
            .then(onSignin)
            .catch(response => {
                const status = response?.data?.status || response?.status;
                const message = response?.data?.message || response?.message;
                return onFailure(response, status, message);
            });
    },

    signInLocal: (username, password, onSignin, onFailure) => {
        const url = SIGN_IN_LOCAL_API;
        const params = {
            username,
            password
        };
        axiosClient.post(url, params)
            .then(onSignin)
            .catch(response => {
                const status = response?.data?.status || response?.status;
                const message = response?.data?.message || response?.message;
                return onFailure(response, status, message);
            });
    },

    signUpStudent: (userInfo, onSuccess, onFailure) => {
        const url = SIGN_UP_STUDENT_GOOGLE_API;
        const params = { ...userInfo };

        return axiosClient.post(url, params)
            .then(onSuccess)
            .catch(response => {
                const status = response?.data?.status || response?.status;
                const message = response?.data?.message || response?.message;
                return onFailure(response, status, message);
            });
    },

    signUpLecturer: (userInfo, onSuccess, onFailure) => {
        const url = SIGN_UP_LECTURER_GOOGLE_API;
        const params = { ...userInfo };
        return axiosClient.post(url, params)
            .then(onSuccess)
            .catch(response => {
                const status = response?.data?.status || response?.status;
                const message = response?.data?.message || response?.message;
                return onFailure(response, status, message);
            });
    },

    getCurrentUserInfo: (onSuccess, onFailure) => {
        const url = GET_USER_INFO_API;
        const accessToken = storageTool.getAccessToken();

        if (!accessToken) {
            Promise
                .reject(new Error(ACCESS_TOKEN_NOT_EXIST))
                .catch(onFailure);
            return;
        }

        const params = paramsTools.getParamsWithAccessToken();

        axiosClient.get(url, params)
            .then(onSuccess)
            .catch(response => {
                const status = response?.data?.status || response?.status;
                const message = response?.data?.message || response?.message;
                return onFailure(response, status, message);
            });
    },

    //Same url as getCurrentUserInfo but we could change it
    checkValidAccessToken: (onSuccess, onFailure) => {
        const url = CHECK_VALID_ACCESS_TOKEN;
        const accessToken = storageTool.getAccessToken();

        if (!accessToken) {
            Promise
                .reject(new Error("ACCESS_TOKEN_NOT_EXIST"))
                .catch(onFailure);
            return;
        }

        const params = paramsTools.getParamsWithAccessToken();

        axiosClient.get(url, params)
            .then(onSuccess)
            .catch(response => {
                const status = response?.data?.status || response?.status;
                const message = response?.data?.message || response?.message;
                return onFailure(response, status, message);
            });
    },

    checkSignUpEmail: (id_token, onSuccess, onFailure) => {
        const url = CHECK_VALID_SIGN_UP_EMAIL;

        const params = { token: id_token };

        axiosClient.post(url, params)
            .then(onSuccess)
            .catch(response => {
                const status = response?.data?.status || response?.status;
                const message = response?.data?.message || response?.message;
                return onFailure(response, status, message);
            });
    }
}

export default authApi;