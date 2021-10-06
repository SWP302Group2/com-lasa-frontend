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

}

export default authApi;