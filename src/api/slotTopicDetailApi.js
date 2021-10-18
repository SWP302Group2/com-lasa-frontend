import axios from "axios";
import { GET_SLOT_TOPIC_DETAIL_API, PRODUCT_BASE_URL } from "../utils/constant";
import queryString from "query-string";

const slotTopicDetailApi = {
    getAllSlotTopicDetailBySlotIds: (slotIds, onSuccess, onFailure) => {
        let apiUrl = GET_SLOT_TOPIC_DETAIL_API + "?paging=false";
        const header = {
            baseURL: PRODUCT_BASE_URL,
            headers: {
                "Content-Type": "application/json",
            },
            paramsSerializer: params => queryString.stringify(params),
        };

        if (!Array.isArray(slotIds) || slotIds.length === 0) return;


        const urlList = [];
        const length = slotIds.length;

        if (length === 0) {
            urlList.push(apiUrl);
        }
        if (length > 0) {
            let index = 0;
            do {
                const piece = [...slotIds].slice(index, index + 30);
                let paramString = "";
                piece.forEach(id => {
                    paramString += `&sId=${id}`;
                });
                const pieceUrl = apiUrl + paramString;
                urlList.push(pieceUrl);
                index += 30;
            } while (index < length);
        }
        console.log("This is url list");
        console.log(urlList)

        const requests = [];
        for (let i = 0; i < urlList.length; i++) {
            const request = axios.get(urlList[i], header);
            requests.push(request);
        }


        axios.all(requests)
            .then(axios.spread((...responses) => {
                let resultArray = [];
                console.log("Detail original response");
                console.log(responses);
                responses.forEach(response => resultArray = resultArray.concat(response.data));
                return resultArray;
            }))
            .then(onSuccess)
            .catch(onFailure);
    }
}





export default slotTopicDetailApi;