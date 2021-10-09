import cookieTools from "../utils/cookieTools";
import axiosClient from "./axiosClient";

const authApi = {
    signInGoogle: (id_token) => {
        const url = "/authentication/google";
        const params = { token: id_token };
        return axiosClient.post(url, params);
    },

    signInLocal: (username, password) => {
        const url = "/authentication";
        const params = {
            username,
            password
        };
        return axiosClient.post(url, params);
    },

    signUpStudent: (id_token) => {
        const url = "/authentication/google/student";
        const params = { token: id_token };
        return axiosClient.post(url, params);
    },

    signUpLecturer: (id_token) => {
        const url = "/authentication/google/lecturer";
        const params = { token: id_token };
        return axiosClient.post(url, params);
    },

    getCurrentUserInfo: () => {
        const url = "/home/information";
        const accessToken = cookieTools.getAccessToken();

        if (!accessToken)
            return Promise.reject(new Error("ACCESS_TOKEN_NOT_EXIST"));

        const params = {
            headers: {
                Authorization: accessToken,
            }
        };
        return axiosClient.get(url, params);
    }
}

export default authApi;