import cookieTools from "../utils/cookieTools";
import axiosClient from "./axiosClient";


const slotApi = {
    getSlots: () => {
        const url = "/slots";
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

export default slotApi;