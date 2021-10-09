import cookieTools from "../utils/cookieTools";
import axiosClient from "./axiosClient";


const bookingApi = {
    getBookings: () => {
        const url = "/booking-requests";
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

export default bookingApi;