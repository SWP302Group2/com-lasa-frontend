import axios from "axios";
import {
  BASE_URL,
  GET_SLOT_API,
  ORDER_BY_ASC,
  SLOT_STATUS_CANCELED,
  SLOT_STATUS_WAITING,
  SORT_BY_TIME_START,
} from "../utils/constant";
import axiosClient from "./axiosClient";
import storageTools from "../utils/storageTools";
import { paramsTools } from "./paramsTools";
import dateTools from "../utils/dateTools";

const USING_BASE_URL = BASE_URL;

const slotApi = {
  getSlots: (onSuccess, onFailure) => {
    const url = GET_SLOT_API;
    const accessToken = storageTools.getAccessToken();
    const params = {
      headers: {
        Authorization: accessToken,
      },
    };
    return axiosClient
      .get(url, params)
      .then(onSuccess)
      .catch((response) => {
        const status = response?.data?.status || response?.status;
        const message = response?.data?.message || response?.message;
        return onFailure(response, status, message);
      });
  },

  getSlotsBySlotIdWithoutPaging: (onSuccess, onFailure, slotIds) => {
    const noPaging = `paging=false`;
    const withLecturer = `getLecturer=true`;
    const withTopic = `getTopic=true`;

    const apiUrl = GET_SLOT_API + `?${noPaging}&${withLecturer}&${withTopic}`;
    const params = paramsTools.getParamsWithAccessToken();

    const requests = [];
    const length = slotIds.length;
    if (length === 0) {
      requests.push(axios.get(apiUrl, params));
    }
    if (length > 0) {
      let index = 0;
      do {
        const piece = [...slotIds].slice(index, index + 20);
        let slotIdParamString = "";
        piece.forEach((slotId) => (slotIdParamString += `&slotId=${slotId}`));

        requests.push(axios.get(apiUrl + slotIdParamString, params));
        index += 20;
      } while (index < length);
    }

    axios
      .all(requests)
      .then(
        axios.spread((...responses) => {
          let resultArray = [];
          responses.forEach(
            (response) => (resultArray = resultArray.concat(response.data))
          );
          return resultArray;
        })
      )
      .then(onSuccess)
      .catch(onFailure);
  },

  getCurrentUserSlot: (onSuccess, onFailure, userId) => {
    const noPaging = "paging=false";
    const lecturerId = `lecId=${userId}`;
    const isGetTopic = `getTopic=true`;
    const sortBy = "sortBy=timeStart";

    const apiUrl =
      GET_SLOT_API + `?${noPaging}&${lecturerId}&${isGetTopic}&${sortBy}`;
    const params = paramsTools.getParamsWithAccessToken();

    return axiosClient
      .get(apiUrl, params)
      .then(onSuccess)
      .catch((response) => {
        const status = response?.data?.status || response?.status;
        const message = response?.data?.message || response?.message;
        return onFailure(response, status, message);
      });
  },

  getAllSlotsWithPaging: (onSuccess, onFailure, pageIndex) => {
    const paging = `paging=true`;
    const pageNum = `page=${pageIndex || 0}`;
    const withLecturer = `getLecturer=true`;
    const sortByStartTime = "sortBy=timeStart";

    const apiUrl =
      GET_SLOT_API + `?${paging}&${pageNum}&${withLecturer}&${sortByStartTime}`;
    const params = paramsTools.getParamsWithAccessToken();

    return axiosClient
      .get(apiUrl, params)
      .then(onSuccess)
      .catch((response) => {
        const status = response?.data?.status || response?.status;
        const message = response?.data?.message || response?.message;
        return onFailure(response, status, message);
      });
  },

  searchAllSlotsWithoutPaging: (searchCriteria, onSuccess, onFailure) => {
    let apiUrl = GET_SLOT_API + "?paging=false";
    const params = paramsTools.getParamsWithAccessToken();

    //Add time start and time end of slot
    const { timeStart, timeEnd } = dateTools.getTimeStartAndTimeEndInISOFormat(
      searchCriteria.time
    );
    apiUrl += `&timeStart=${timeStart}&timeEnd=${timeEnd}`;

    const requests = [];
    const length = searchCriteria.lecturers?.length || 0;
    if (length === 0) {
      requests.push(axios.get(apiUrl, params));
    }
    if (length > 0) {
      let index = 0;
      do {
        const piece = [...searchCriteria.lecturers].slice(index, index + 20);
        let lecturerIdParamString = "";
        piece.forEach(
          (lecturer) => (lecturerIdParamString += `&lecId=${lecturer.id}`)
        );

        requests.push(axios.get(apiUrl + lecturerIdParamString, params));
        index += 20;
      } while (index < length);
    }

    axios
      .all(requests)
      .then(
        axios.spread((...responses) => {
          let resultArray = [];
          responses.forEach(
            (response) => (resultArray = resultArray.concat(response.data))
          );
          return resultArray;
        })
      )
      .then(onSuccess)
      .catch(onFailure);
  },

  searchAllSlotsWithPaging: async (
    onSuccess,
    onFailure,
    pageIndex,
    searchCriteria,
    numOfElements
  ) => {
    const paging = `paging=true`;
    const size = `size=${
      Number.isInteger(numOfElements) && numOfElements > 0 ? numOfElements : 10
    }`;
    const pageNum = `page=${
      Number.isInteger(pageIndex) && pageIndex >= 0 ? pageIndex : 0
    }`;
    const withLecturer = `getLecturer=true`;
    const withTopic = `getTopic=true`;
    const sortBy = `sortBy=${
      searchCriteria.sortBy?.value || SORT_BY_TIME_START
    }`;
    const orderBy = `orderBy=${searchCriteria.orderBy?.value || ORDER_BY_ASC}`;
    const status = `status=${SLOT_STATUS_WAITING}`;

    let apiUrl =
      GET_SLOT_API +
      `?${paging}&${pageNum}&${withLecturer}&${withTopic}&${sortBy}&${size}&${orderBy}&${status}`;

    if (searchCriteria.time?.getValue()) {
      const time = dateTools.getTimeStartAndTimeEndInISOFormat(
        searchCriteria.time
      );
      const timeStart = `timeStart=${time.timeStart}`;
      const timeEnd = `timeEnd=${time.timeEnd}`;
      apiUrl += `&${timeStart}&${timeEnd}`;
    }

    let lecturerIdParamString = "";
    searchCriteria.lecturers?.forEach(
      (lecturer) => (lecturerIdParamString += `&lecId=${lecturer.id}`)
    );
    let topicIdParamString = "";
    searchCriteria.topics?.forEach(
      (topic) => (topicIdParamString += `&topicId=${topic?.id}`)
    );

    apiUrl += lecturerIdParamString + topicIdParamString;

    const params = {
      baseURL: USING_BASE_URL,
      headers: {
        "Content-Type": "application/json",
        uuid: searchCriteria.uuid,
        Authorization: storageTools.getAccessToken(),
      },
    };

    try {
      const response = await axios.get(apiUrl, params);
      return onSuccess(response.data, response.headers, response);
    } catch (response) {
      const status = response?.data?.status || response?.status;
      const message = response?.data?.message || response?.message;
      return onFailure(response, status, message);
    }
  },

  createSlot: (onSuccess, onFailure, lecturerId, slotInfo) => {
    const url = GET_SLOT_API;
    const params = paramsTools.getParamsWithAccessToken();

    const timeStartString = dateTools.convertDateToISOStringWithTimeZoneOffset(
      slotInfo.timeStart
    );
    const timeEndString = dateTools.convertDateToISOStringWithTimeZoneOffset(
      slotInfo.timeEnd
    );
    const data = {
      lecturerId,
      timeStart: timeStartString,
      timeEnd: timeEndString,
      topics: slotInfo.selectedTopics?.map((topic) => topic.id),
    };

    console.log("Create slot data");
    console.log(data);

    return axiosClient
      .post(url, data, params)
      .then(onSuccess)
      .catch((response) => {
        const status = response?.data?.status || response?.status;
        const message = response?.data?.message || response?.message;
        return onFailure(response, status, message);
      });
  },

  updateSlot: (onSuccess, onFailure, lecturerId, slotId, topics) => {
    const url = GET_SLOT_API;
    const params = paramsTools.getParamsWithAccessToken();

    const data = {
      lecturerId,
      id: slotId,
      topics: topics?.map((topic) => topic.id),
    };

    console.log("Update slot data");
    console.log(data);

    return axiosClient
      .patch(url, data, params)
      .then(onSuccess)
      .catch((response) => {
        const status = response?.data?.status || response?.status;
        const message = response?.data?.message || response?.message;
        return onFailure(response, status, message);
      });
  },

  cancelSlot: (onSuccess, onFailure, lecturerId, slotId) => {
    const url = GET_SLOT_API;
    const params = paramsTools.getParamsWithAccessToken();

    const data = {
      lecturerId,
      id: slotId,
      status: SLOT_STATUS_CANCELED,
    };

    console.log("Cancel slot data");
    console.log(data);

    return axiosClient
      .patch(url, data, params)
      .then(onSuccess)
      .catch((response) => {
        const status = response?.data?.status || response?.status;
        const message = response?.data?.message || response?.message;
        return onFailure(response, status, message);
      });
  },

  removeSlot: (onSuccess, onFailure, slotId) => {
    const url = GET_SLOT_API + `?id=${slotId}`;
    const params = paramsTools.getParamsWithAccessToken();

    return axiosClient
      .delete(url, params)
      .then(onSuccess)
      .catch((response) => {
        const status = response?.data?.status || response?.status;
        const message = response?.data?.message || response?.message;
        return onFailure(response, status, message);
      });
  },

  getBookingRequestOfASlot: (onSuccess, onFailure, slotId) => {
    const url = GET_SLOT_API + `/${slotId}/booking-requests`;
    const params = paramsTools.getParamsWithAccessToken();

    return axiosClient
      .get(url, params)
      .then(onSuccess)
      .catch((response) => {
        const status = response?.data?.status || response?.status;
        const message = response?.data?.message || response?.message;
        return onFailure(response, status, message);
      });
  },

  denyARequest: (onSuccess, onFailure, userId, bookingId, slotId) => {
    const url = GET_SLOT_API + `/${slotId}/booking-requests`;
    const params = paramsTools.getParamsWithAccessToken();

    const data = {
      bookingId,
      lecturerId: userId,
      slotId,
      status: -1,
    };

    return axiosClient
      .patch(url, data, params)
      .then(onSuccess)
      .catch((response) => {
        const status = response?.data?.status || response?.status;
        const message = response?.data?.message || response?.message;
        return onFailure(response, status, message);
      });
  },

  acceptARequest: (onSuccess, onFailure, userId, bookingId, slotId) => {
    const url = GET_SLOT_API + `/${slotId}/booking-requests`;
    const params = paramsTools.getParamsWithAccessToken();

    const data = {
      bookingId,
      lecturerId: userId,
      slotId,
      status: 2,
    };

    return axiosClient
      .patch(url, data, params)
      .then(onSuccess)
      .catch((response) => {
        const status = response?.data?.status || response?.status;
        const message = response?.data?.message || response?.message;
        return onFailure(response, status, message);
      });
  },
};

export default slotApi;
