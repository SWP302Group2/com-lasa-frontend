import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import bookingApi from "../../api/bookingApi";
import slotApi from "../../api/slotApi";
import dateTools from "../../utils/dateTools";
import StudentBookingRequest from "./StudentBookingRequest";
function StudentDashboardBookingRequest() {
    const [bookingRequests, setBookingRequests] = useState([]);
    const [preparedBookingRequest, setPreparedBookingRequest] = useState([]);
    // const [editingBookingRequest, setEditingBookingRequest] = useState([]);
    const userId = useSelector(state => state.user.id);

    useEffect(() => {
        callGetCurrentUserBookingRequests();

        function callGetCurrentUserBookingRequests() {
            const onGetSuccess = (data) => {
                console.log("Student dashboard get bookings success:");
                console.log(data);

                setBookingRequests(data);
            }

            const onGetFailure = (response, status, message) => {
                console.log("Student dashboard get bookings fail:");
                console.log(response);
                setBookingRequests(null);
            }

            bookingApi.getCurrentUserBookingsWithoutPaging(userId, 0, onGetSuccess, onGetFailure);
        }
    }, [userId]);

    useEffect(() => {
        if (bookingRequests && bookingRequests.length > 0) {
            callGetBookingRequestSlotInfo();
        }

        function callGetBookingRequestSlotInfo() {
            const onGetSuccess = (data) => {
                console.log("Get slot info of booking request succeed:");
                console.log(data);

                let preparingBookingRequests = [...bookingRequests];
                //Add lecturer
                preparingBookingRequests = [...bookingRequests].map(request => {
                    const slot = [...data].find(slot => request.slotId === slot.id);
                    if (slot) {
                        request.topic = [...slot.topics].find(topic => topic.id === request.topicId);
                        request.slot = slot;
                        request.createTime = dateTools.convertLocalDateTimeStringToObject(request.createTime);
                        request.slot.timeStart = dateTools.convertLocalDateTimeStringToObject(request.slot.timeStart);
                    }
                    return request;
                })
                console.log(preparingBookingRequests);
                setPreparedBookingRequest(preparingBookingRequests);
            }

            const onGetFailure = (response, status, message) => {
                console.log("Get slot info of booking request failed:");
                console.log(response);
                setPreparedBookingRequest(null);
            }


            const slotIds = [...bookingRequests].map(request => request.slotId);
            slotApi.getSlotsBySlotIdWithoutPaging(slotIds, onGetSuccess, onGetFailure);
        }
    }, [bookingRequests])

    useEffect(() => {
        const bookingDashboard = document.querySelector(".student-dashboard .sidebar__link-booking");
        bookingDashboard?.classList.add("active-dashboard-content");

        return () => {
            bookingDashboard?.classList.remove("active-dashboard-content");
        }
    }, [])

    return (
        <div className="student-dashboard__content student-dashboard__booking">
            <h2 className="student-dashboard__content__headline">Booking requests</h2>
            <div className="booking-list booking-list--waiting">
                <h3 className="booking-list__headline">
                    Waiting for accept
                </h3>
                <div className="booking-list__content">
                    {preparedBookingRequest && preparedBookingRequest.length > 0 && [...preparedBookingRequest]
                        .filter(bookingRequest => bookingRequest.status === 1)
                        .map(bookingRequest =>
                            <StudentBookingRequest
                                key={bookingRequest.id}
                                bookingRequest={bookingRequest}
                            >
                                <div className="booking-request__panel">
                                    <i className="material-icons edit">
                                        edit
                                    </i>
                                    <i className="material-icons clear">
                                        highlight_off
                                    </i>
                                </div>
                            </StudentBookingRequest>
                        )
                    }
                </div>
            </div>
            <div className="booking-list booking-list--ready">
                <h3 className="booking-list__headline">
                    Ready for meeting
                </h3>
                <div className="booking-list__content">
                    {preparedBookingRequest && preparedBookingRequest.length > 0 && [...preparedBookingRequest]
                        .filter(bookingRequest => bookingRequest.status === 2)
                        .map(bookingRequest =>
                            <StudentBookingRequest
                                key={bookingRequest.id}
                                bookingRequest={bookingRequest}
                            >
                            </StudentBookingRequest>
                        )
                    }
                </div>
            </div>
            <div className="booking-list booking-list--denied">
                <h3 className="booking-list__headline">
                    Was denied
                </h3>
                <div className="booking-list__content">
                    {preparedBookingRequest && preparedBookingRequest.length > 0 && [...preparedBookingRequest]
                        .filter(bookingRequest => bookingRequest.status === -1)
                        .map(bookingRequest =>
                            <StudentBookingRequest
                                key={bookingRequest.id}
                                bookingRequest={bookingRequest}
                            >
                                <div className="booking-request__panel">
                                    <i className="material-icons edit">
                                        edit
                                    </i>
                                    <i className="material-icons clear">
                                        highlight_off
                                    </i>
                                </div>
                            </StudentBookingRequest>
                        )
                    }
                </div>
            </div>
            <div className="booking-list booking-list--canceled">
                <h3 className="booking-list__headline">
                    Canceled
                </h3>
                <div className="booking-list__content">
                    {preparedBookingRequest && preparedBookingRequest.length > 0 && [...preparedBookingRequest]
                        .filter(bookingRequest => bookingRequest.status === 0)
                        .map(bookingRequest =>
                            <StudentBookingRequest
                                key={bookingRequest.id}
                                bookingRequest={bookingRequest}
                            >
                                <div className="booking-request__panel">
                                    <i className="material-icons edit">
                                        visibility
                                    </i>
                                    <i className="material-icons clear">
                                        highlight_off
                                    </i>
                                </div>
                            </StudentBookingRequest>
                        )
                    }
                </div>
            </div>
            <div className="booking-list booking-list--finish-meeting">
                <h3 className="booking-list__headline">
                    Finished
                </h3>
                <div className="booking-list__content">
                    {preparedBookingRequest && preparedBookingRequest.length > 0 && [...preparedBookingRequest]
                        .filter(bookingRequest => bookingRequest.status === 3)
                        .map(bookingRequest =>
                            <StudentBookingRequest
                                key={bookingRequest.id}
                                bookingRequest={bookingRequest}
                            >
                                <div className="booking-request__panel">
                                    <i className="material-icons edit">
                                        visibility
                                    </i>
                                    <i className="material-icons clear">
                                        highlight_off
                                    </i>
                                </div>
                            </StudentBookingRequest>
                        )
                    }
                </div>
            </div>


        </div >
    );
}

export default StudentDashboardBookingRequest;