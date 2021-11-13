import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import bookingApi from "../../api/bookingApi";
import { addLocation } from "../../redux/actions/history";
import PageBar from "./PageBar";
import TableLoadingEffect from "./TableLoadingEffect";

function AdminDashboardBooking() {
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(0);
    const [bookingRequests, setBookingRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(function saveLocation() {
        dispatch(addLocation(history?.location?.pathname));
    }, [dispatch, history]);


    function handleOnClickChangePage(pageIndex) {
        setPage(pageIndex);
    }

    useEffect(() => {
        const bookingDashboard = document.querySelector(".admin-dashboard .sidebar__link-booking");
        const start = () => {
            bookingDashboard?.classList.add("active-dashboard-content");
            callGetBookingRequest();
        }
        start();

        const end = () => {
            bookingDashboard?.classList.remove("active-dashboard-content");
        }

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

            setIsLoading(true);
            bookingApi.getBookingsWithPaging(page, onGetSuccess, onGetFailure);
        }

        return end;
    }, [page])
    return (
        <div className="admin-dashboard__content admin-dashboard__booking">
            <h3 className="admin-dashboard__content__headline">
                Booking Request Management
            </h3>
            <div className="list">
                <div className="list__headline">
                    <div className="list__headline__th">Id</div>
                    <div className="list__headline__th">Slot Id</div>
                    <div className="list__headline__th">Owner Id</div>
                    <div className="list__headline__th">Owner Name</div>
                    <div className="list__headline__th">Title</div>
                    <div className="list__headline__th">Topic</div>
                    <div className="list__headline__th">Questions</div>
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
                        <div className="list__row__td student-name">{bookingRequest.student?.name}</div>
                        <div className="list__row__td title">{bookingRequest.title}</div>
                        <div className="list__row__td topic">{bookingRequest.topic?.courseId}</div>
                        <div className="list__row__td question">View question</div>
                        <div className="list__row__td status">
                            {bookingRequest.status === 2 && "Accepted"}
                            {bookingRequest.status === 1 && "Waiting"}
                            {bookingRequest.status === 0 && "Cancled"}
                            {bookingRequest.status === -1 && "Denied"}
                        </div>

                    </div>
                )}
                {isLoading ? <TableLoadingEffect /> : null}
            </div>
            {totalPages && totalPages > 0 &&
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