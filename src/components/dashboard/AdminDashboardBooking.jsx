import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import bookingApi from "../../api/bookingApi";
import { addLocation } from "../../redux/actions/history";
import BookingStatusBar from "./BookingStatusBar";
import PageBar from "./PageBar";
import Loader from "../Loader";

function AdminDashboardBooking() {
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(0);
    const [bookingRequests, setBookingRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isGettingBookings, setIsGettingBookings] = useState(true);


    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(function saveLocation() {
        dispatch(addLocation(history?.location?.pathname));
    }, [dispatch, history]);

    function handleOnClickChangePage(pageIndex) {
        setPage(pageIndex);
        setIsGettingBookings(true);
    }

    useEffect(function activeContent() {
        const bookingDashboard = document.querySelector(".admin-dashboard .sidebar__link-booking");
        bookingDashboard?.classList.add("active-dashboard-content");
        return () => {
            bookingDashboard?.classList.remove("active-dashboard-content");
        }
    }, [])

    useEffect(function callApiGetBookings() {
        if (!isGettingBookings) return;
        setIsGettingBookings(false);
        setIsLoading(true);
        callGetBookingRequest();

        function callGetBookingRequest() {
            const onGetSuccess = (data) => {
                console.log("Dashboard get booing success:");
                console.log(data);

                setIsLoading(false);
                if (data.number !== page) return;

                setBookingRequests(data.content);
                setTotalPages(data.totalPages);
            }

            const onGetFailure = (response, status, message) => {
                console.log("Dashboard get booking failed:");
                console.log(response);
                setBookingRequests(null);
                setIsLoading(false);
            }

            bookingApi.getBookingsWithPaging(onGetSuccess, onGetFailure, page);
        }
    }, [page, isGettingBookings]);

    return (
        <div className="admin-dashboard__content admin-dashboard__booking">
            <h3 className="admin-dashboard__content__headline">
                Booking Request Management
            </h3>
            <div className="list">
                <div className="list__headline">
                    <div className="list__headline__th">Id</div>
                    <div className="list__headline__th">Slot</div>
                    <div className="list__headline__th">Student</div>
                    <div className="list__headline__th">Student name</div>
                    <div className="list__headline__th">Title</div>
                    <div className="list__headline__th">Status</div>
                </div>
                {bookingRequests && bookingRequests.length > 0 && bookingRequests.map(bookingRequest =>
                    <div
                        className="list__row"
                        key={`slot_${bookingRequest.id}`}
                    >
                        <div className="list__row__td id">{bookingRequest.id}</div>
                        <div className="list__row__td slot-id">{bookingRequest.slotId}</div>
                        <div className="list__row__td student-id">{bookingRequest.student?.id}</div>
                        <div className="list__row__td student-id">{bookingRequest.student?.name}</div>
                        <div className="list__row__td title">{bookingRequest.title}</div>
                        <div className="list__row__td status">
                            <BookingStatusBar status={bookingRequest.status} />
                        </div>
                    </div>
                )}
                {isLoading ? <Loader /> : null}
            </div>
            {totalPages != null && totalPages > 0 &&
                <PageBar
                    currentPage={page}
                    totalPages={totalPages}
                    callBack={handleOnClickChangePage}
                />
            }
        </div>
    );
}

export default AdminDashboardBooking;