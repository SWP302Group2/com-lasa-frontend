import axios from "axios";
import { GET_SLOT_TOPIC_DETAIL_API } from "../utils/constant";
import { paramsTools } from "./paramsTools";

const slotTopicDetailApi = {
    getAllSlotTopicDetailBySlotIds: (slotIds, onSuccess, onFailure) => {
        let apiUrl = GET_SLOT_TOPIC_DETAIL_API + `?paging=false`;
        const params = paramsTools.getParamsWithAccessToken();

        const requests = [];
        const length = slotIds.length || 0;
        if (length === 0) {
            requests.push(axios.get(apiUrl, params));
        }
        if (length > 0) {
            let index = 0;
            do {
                const piece = [...slotIds].slice(index, index + 30);
                let slotParamString = "";
                piece.forEach(id => slotParamString += `&sId=${id}`);

                requests.push(axios.get(apiUrl + slotParamString, params));
                index += 30;
            } while (index < length);
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