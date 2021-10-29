import { DEVELOP_BASE_URL } from "../utils/constant";
import storageTools from "../utils/storageTools";
import queryString from "query-string";

const BASE_URL = DEVELOP_BASE_URL;
export const paramsTools = {
    getParamsWithAccessToken: () => {
        const accessToken = storageTools.getAccessToken();
        return {
            baseURL: BASE_URL,
            headers: {
                "Content-Type": "application/json",
                Authorization: accessToken,
            },
            paramsSerializer: params => queryString.stringify(params),
        };
    }
}