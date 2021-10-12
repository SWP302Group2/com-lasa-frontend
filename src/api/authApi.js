import cookieTools from "../utils/cookieTools";
import axiosClient from "./axiosClient";

const authApi = {
    signInGoogle: (id_token, onSignin, onFailure) => {
        const url = "/authentication/google";
        const params = { token: id_token };
        axiosClient.post(url, params)
            .then(onSignin)
            .catch(onFailure);
    },

    signInLocal: (username, password, onSignin, onFailure) => {
        const url = "/authentication";
        const params = {
            username,
            password
        };
        axiosClient.post(url, params)
            .then(onSignin)
            .catch(response => onFailure(response, username));
    },

    signUpStudent: (userInfo, onSuccess, onFailure) => {
        const url = "/authentication/google/student";
        const params = { ...userInfo };
        return axiosClient.post(url, params).then(onSuccess).catch(onFailure);
    },

    signUpLecturer: (userInfo, onSuccess, onFailure) => {
        const url = "/authentication/google/lecturer";
        const params = { ...userInfo };
        return axiosClient.post(url, params).then(onSuccess).catch(onFailure);
    },

    getCurrentUserInfo: (onSuccess, onFailure) => {
        const url = "/home/information";
        const accessToken = cookieTools.getAccessToken();

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
            .then()
            .then(onSuccess)
            .catch(onFailure);
    },

    checkSignUpEmail: (id_token, onSuccess, onFailure) => {
        const url = "/authentication/email";
        const params = { token: id_token };
        axiosClient.post(url, params)
            .then(onSuccess)
            .catch(onFailure);
    }
}

export default authApi;