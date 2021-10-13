import storageTool from "../utils/storageTools";
import axiosClient from "./axiosClient";

const authApi = {
    signInGoogle: (id_token, onSignin, onFailure) => {
        const url = "/authentication/google";
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
        const url = "/authentication";
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
        const url = "/authentication/google/student";
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
        const url = "/authentication/google/lecturer";
        const params = { ...userInfo };
        return axiosClient.post(url, params).then(onSuccess).catch(onFailure);
    },

    getCurrentUserInfo: (onSuccess, onFailure) => {
        const url = "/home/information";
        const accessToken = storageTool.getAccessToken();

        if (!accessToken) {
            Promise
                .reject(new Error("ACCESS_TOKEN_NOT_EXIST"))
                .catch(onFailure);
            return;
        }

        const params = {
            headers: {
                Authorization: accessToken,
            }
        };
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
        const url = "/home/information";
        const accessToken = storageTool.getAccessToken();

        if (!accessToken) {
            Promise
                .reject(new Error("ACCESS_TOKEN_NOT_EXIST"))
                .catch(onFailure);
            return;
        }

        const params = {
            headers: {
                Authorization: accessToken,
            }
        };
        axiosClient.get(url, params)
            .then(onSuccess)
            .catch(response => {
                const status = response?.data?.status || response?.status;
                const message = response?.data?.message || response?.message;
                return onFailure(response, status, message);
            });
    },

    checkSignUpEmail: (id_token, onSuccess, onFailure) => {
        const url = "/authentication/email";
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