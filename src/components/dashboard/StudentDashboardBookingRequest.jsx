import { useEffect, useState } from "react";
import BookingRequestList from "./BookingRequestList";
import { BOOKING_REQUEST_STATUS_CANCELED, BOOKING_REQUEST_STATUS_DENIED, BOOKING_REQUEST_STATUS_FINISHED, BOOKING_REQUEST_STATUS_NOTIFIED, BOOKING_REQUEST_STATUS_READY, BOOKING_REQUEST_STATUS_WAITING } from "../../utils/constant";
import bookingApi from "../../api/bookingApi";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addLocation } from "../../redux/actions/history";



function StudentDashboardBookingRequest() {
    const [notifiedBookingRequests, setNotifiedBookingRequests] = useState([]);
    const [isRefresh, setIsRefresh] = useState(true);

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(function saveLocation() {
        dispatch(addLocation(history?.location?.pathname));
    }, [dispatch, history]);

    const userId = useSelector(state => state.user.id)
    useEffect(() => {
        if (isRefresh) {
            callGetNotifiedBookingRequest();
            setIsRefresh(false);
        }

        function callGetNotifiedBookingRequest() {
            const onGetSuccess = (data) => {
                console.log(`Get current user notified requests success:`);
                console.log(data);
                if (!data || data.lenght <= 0) {
                    setNotifiedBookingRequests(null);
                    return;
                }
                setNotifiedBookingRequests(data);
            }

            const onGetFailure = (response, status, message) => {
                console.log(`Get current user notified requests false`);
                console.log(response);
                setNotifiedBookingRequests(null);
            }

            bookingApi.getCurrentUserBookingsWithoutPaging(onGetSuccess, onGetFailure,
                userId, BOOKING_REQUEST_STATUS_NOTIFIED);
        }
    }, [isRefresh, userId]);

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
            <BookingRequestList
                status={BOOKING_REQUEST_STATUS_WAITING}
                title={"Waiting for approval"}
            />
            {notifiedBookingRequests &&
                <BookingRequestList
                    status={BOOKING_REQUEST_STATUS_READY}
                    title={"Ready for meeting"}
                    additionalBks={notifiedBookingRequests}
                    setIsRefreshAdditionalBks={setIsRefresh}
                />
            }
            <BookingRequestList
                status={BOOKING_REQUEST_STATUS_DENIED}
                title={"Denied"}
            />
            <BookingRequestList
                status={BOOKING_REQUEST_STATUS_CANCELED}
                title={"Canceled"}
            />
            <BookingRequestList
                status={BOOKING_REQUEST_STATUS_FINISHED}
                title={"Finished"}
            />
        </div >
    );
}

export default StudentDashboardBookingRequest;