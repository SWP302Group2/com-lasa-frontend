import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import bookingApi from "../../api/bookingApi";
import slotApi from "../../api/slotApi";
import dateTools from "../../utils/dateTools";
import Loader from "../Loader";
import BookingRequestListHeader from "./BookingRequestListHeader";
import StudentBookingRequest from "./StudentBookingRequest";

function BookingRequestList({ status, title, additionalBks, setIsRefreshAdditionalBks }) {
    const [bookingRequests, setBookingRequests] = useState([]);
    const [isRefresh, setIsRefresh] = useState(true);
    const [preparedBookingRequests, setPreparedBookingRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const userId = useSelector(state => state.user.id);

    function callRefresh() {
        setIsRefresh(true);
        if (additionalBks) {
            setIsRefreshAdditionalBks(true);
        }
    }

    useEffect(() => {
        if (isRefresh) {
            callGetBookingRequest();
            setIsRefresh(false);
            setIsLoading(true);
        }

        function callGetBookingRequest() {
            const onGetSuccess = (data) => {
                console.log(`Get current user requests success with status:${status}`);
                console.log(data);
                setIsLoading(false);
                if (!data || data.lenght <= 0) {
                    setBookingRequests(null);
                    return;
                }
                setBookingRequests(data);
            }

            const onGetFailure = (response, status, message) => {
                console.log(`Get current user requests failed with status:${status}`);
                console.log(response);
                setIsLoading(false);
                setBookingRequests(null);
            }

            bookingApi.getCurrentUserBookingsWithoutPaging(onGetSuccess, onGetFailure, userId, status);
        }
    }, [isRefresh, status, userId]);



    useEffect(() => {
        let mounted = true;
        if (bookingRequests && bookingRequests.length > 0) {
            callGetBookingRequestSlotInfo();
            setIsLoading(true);
        }

        function callGetBookingRequestSlotInfo() {
            const onGetSuccess = (data) => {
                console.log("Get slot info of booking request success:");
                console.log(data);
                setIsLoading(false);

                if (!mounted) return;
                let preparingBookingRequests = [...bookingRequests];
                if (additionalBks && additionalBks.length > 0) {
                    preparingBookingRequests = preparingBookingRequests.concat(additionalBks);
                }
                //Add lecturer
                preparingBookingRequests = [...preparingBookingRequests].map(request => {
                    const slot = [...data].find(slot => request.slotId === slot.id);
                    if (slot) {
                        request.topic = [...slot.topics].find(topic => topic.id === request.topicId);
                        request.slot = slot;
                        request.createTime = dateTools.convertLocalDateTimeStringToObject(request.createTime);
                        request.slot.timeStart = dateTools.convertLocalDateTimeStringToObject(request.slot.timeStart);
                        request.slot.timeEnd = dateTools.convertLocalDateTimeStringToObject(request.slot.timeEnd);
                    }
                    return request;
                })
                console.log("Prepared");
                console.log(preparingBookingRequests);
                setPreparedBookingRequests(preparingBookingRequests);
            }

            const onGetFailure = (response, status, message) => {
                console.log("Get slot info of booking request failed:");
                console.log(response);
                setIsLoading(false);

                if (!mounted) return;
                setPreparedBookingRequests(null);
            }

            let slotIds = [...bookingRequests].map(request => request.slotId);
            if (additionalBks && additionalBks.length > 0) {
                slotIds = slotIds.concat([...additionalBks].map(request => request.slotId));
            }
            slotApi.getSlotsBySlotIdWithoutPaging(onGetSuccess, onGetFailure, slotIds);
        }

        return () => {
            mounted = false;
        }
    }, [bookingRequests, additionalBks])

    useEffect(() => {
        const list = document.querySelectorAll(".student-dashboard__content .booking-request");
        list.forEach(addAnimationToBookingRequest);

        function addAnimationToBookingRequest(item, index) {
            item.style.animation =
                `dashboard-booking-item-fadein 200ms ease-in-out forwards ${index / 10 + 0.1}s`;
        }

        function removeAnimationInBookingRequest(item, index) {
            item.style.animation = null;
        }

        return () => {
            list.forEach(removeAnimationInBookingRequest);
        };
    }, [bookingRequests, preparedBookingRequests, status]);

    return (
        <div className="booking-list">
            <BookingRequestListHeader
                title={title}
                status={status}
                callRefresh={callRefresh}
            />
            <div className={`booking-list__content booking-list__content--${status}`}>
                {(!preparedBookingRequests || preparedBookingRequests.length <= 0)
                    && <p>Empty</p>
                }
                {
                    preparedBookingRequests
                    && preparedBookingRequests.length > 0
                    && [...preparedBookingRequests].map(bookingRequest =>
                        <StudentBookingRequest
                            key={bookingRequest.id}
                            bookingRequest={bookingRequest}
                            status={status}
                            callRefresh={callRefresh}
                        />
                    )
                }
                {isLoading && <Loader />}
            </div>
        </div>
    );
}

export default BookingRequestList;