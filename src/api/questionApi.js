import cookieTools from "../utils/cookieTools";
import axiosClient from "./axiosClient";


const questionApi = {
    getQuestions: () => {
        const url = "/questions";
        const accessToken = cookieTools.getAccessToken();
        console.log("GET access token in cookie: ");
        console.log(accessToken);
        const params = {
            headers: {
                Authorization: accessToken,
            }
        };
        return axiosClient.get(url, params);
    }


}

export default questionApi;