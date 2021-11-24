import axios from "axios";
import {
  BOOKING_REQUEST_API,
  BOOKING_REQUEST_STATUS_CANCELED,
} from "../utils/constant";
import storageTools from "../utils/storageTools";
import axiosClient from "./axiosClient";
import { paramsTools } from "./paramsTools";

const bookingApi = {
  getBookings: (onSuccess, onFailure) => {
    const url = BOOKING_REQUEST_API;
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

  getBookingsWithPaging: (onSuccess, onFailure, pageIndex) => {
    const paging = `paging=true`;
    const pageNum = `page=${pageIndex || 0}`;
    const withStudent = `getStudent=true`;

    const apiUrl = BOOKING_REQUEST_API + `?${paging}&${pageNum}&${withStudent}`;
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

  getCurrentUserBookingsWithoutPaging: (
    onSuccess,
    onFailure,
    userId,
    status
  ) => {
    const noPaging = `paging=false`;
    const withStudent = `getStudent=true`;
    const studentId = `studentId=${userId}`;
    const statusParam = status != null ? `status=${status}` : "";

    const apiUrl =
      BOOKING_REQUEST_API +
      `?${noPaging}&${statusParam}&${withStudent}&${studentId}`;
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

  createBooking: (
    onSuccess,
    onFailure,
    studentId,
    createTime,
    slotId,
    topicId,
    questions,
    title
  ) => {
    const url = BOOKING_REQUEST_API;
    const params = paramsTools.getParamsWithAccessToken();

    const data = {
      studentId,
      slotId: slotId.toString(),
      topicId: topicId.toString(),
      questions,
      title,
      createTime,
    };

    console.log("Create booking data");
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

  getQuestions: (onSuccess, onFailure, bookingRequestId) => {
    const apiUrl = BOOKING_REQUEST_API + `/${bookingRequestId}/questions`;
    return axiosClient
      .get(apiUrl)
      .then(onSuccess)
      .catch((response) => {
        const status = response?.data?.status || response?.status;
        const message = response?.data?.message || response?.message;
        return onFailure(response, status, message);
      });
  },

  updateBookingRequest: (onSuccess, onFailure, studentId, bookingInfo) => {
    const apiUrl = BOOKING_REQUEST_API;
    const data = {
      studentId,
      id: bookingInfo.id,
      slotId: bookingInfo.slotId,
      title: bookingInfo.title,
      topicId: bookingInfo.topicId,
      questions: [...bookingInfo.questions],
    };

    console.log("ahahahahahah");
    console.log([...bookingInfo.questions]);

    const params = paramsTools.getParamsWithAccessToken();
    return axiosClient
      .patch(apiUrl, data, params)
      .then(onSuccess)
      .catch((response) => {
        const status = response?.data?.status || response?.status;
        const message = response?.data?.message || response?.message;
        return onFailure(response, status, message);
      });
  },

  cancelBookingRequest: (onSuccess, onFailure, studentId, bookingId) => {
    const apiUrl = BOOKING_REQUEST_API;
    const data = {
      id: bookingId,
      studentId,
      status: BOOKING_REQUEST_STATUS_CANCELED,
    };
    const params = paramsTools.getParamsWithAccessToken();
    return axiosClient
      .patch(apiUrl, data, params)
      .then(onSuccess)
      .catch((response) => {
        const status = response?.data?.status || response?.status;
        const message = response?.data?.message || response?.message;
        return onFailure(response, status, message);
      });
  },

  removeBookingRequest: (onSuccess, onFailure, bookingId) => {
    const apiUrl = BOOKING_REQUEST_API + `?id=${bookingId}`;

    const params = paramsTools.getParamsWithAccessToken();
    return axiosClient
      .delete(apiUrl, params)
      .then(onSuccess)
      .catch((response) => {
        const status = response?.data?.status || response?.status;
        const message = response?.data?.message || response?.message;
        return onFailure(response, status, message);
      });
  },

  updateAndRemoveQuestionsForBookingRequest: (
    onSuccess,
    onFailure,
    studentId,
    bookingId,
    newQuestions,
    oldQuestions
  ) => {
    const params = paramsTools.getParamsWithAccessToken();

    if (!newQuestions && !oldQuestions) {
      return Promise.resolve("No new question or removed question").then(
        onSuccess
      );
    }

    const requests = [];
    if (Array.isArray(newQuestions) && newQuestions.length > 0) {
      const updateQuestionApiUrl =
        BOOKING_REQUEST_API + `/${bookingId}/questions`;
      const dataForCreateNew = {
        studentId,
        id: bookingId,
        questions: newQuestions,
      };
      requests.push(axios.post(updateQuestionApiUrl, dataForCreateNew, params));
    }

    if (Array.isArray(oldQuestions) && oldQuestions.length > 0) {
      let questionParamsString = "";
      oldQuestions.forEach(
        (question) => (questionParamsString += `&id=${question.id}`)
      );
      let deleteQuestionUrl =
        BOOKING_REQUEST_API +
        `/${bookingId}/questions?bookingId=${bookingId}` +
        questionParamsString;

      requests.push(axios.delete(deleteQuestionUrl, params));
    }

    console.log(params);
    if (requests.length <= 0) {
      return Promise.resolve("No new question nor removed question").then(
        onSuccess
      );
    }

    return axios
      .all(requests)
      .then(axios.spread(onSuccess))
      .catch((response) => {
        const status = response?.data?.status || response?.status;
        const message = response?.data?.message || response?.message;
        return onFailure(response, status, message);
      });
  },

  getCurrentSlotBookingRequest: (onSuccess, onFailure, slotId) => {
    const noPaging = `paging=false`;
    const withStudent = `getStudent=true`;
    const slotIdParam = `slotId=${slotId}`;

    const apiUrl =
      BOOKING_REQUEST_API + `?${noPaging}&${withStudent}&${slotIdParam}`;
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
};

export default bookingApi;
