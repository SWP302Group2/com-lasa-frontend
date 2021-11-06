import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import "../../assets/css/viewRequestBox.css";
import Loader from "../Loader";
import bookingApi from "../../api/bookingApi";
import BookingRequestLecturerView from "./BookingRequestLecturerView";


function ViewRequestBox({ setViewRequest, refreshCallback }) {

    const [bookingRequests, setBookingRequests] = useState(null);
    const slotInfo = useSelector(state => state.slot)
    const [isLoading, setIsLoading] = useState(false);

    function handleCloseViewRequest() {
        const viewRequestBox = document.querySelector(".view-request-box");
        viewRequestBox?.classList.remove("active-view-request-box");

        setTimeout(() => {
            if (setViewRequest) setViewRequest(false);
        }, 300)
    }

    function handleViewRequestOnKeyDown(event) {
        if (event.key !== "Escape") return;
        handleCloseViewRequest();
    }

    useEffect(activeViewRequestBox, []);
    useEffect(callApiGetBookingRequests, [slotInfo, bookingRequests]);

    function activeViewRequestBox() {
        const viewRequestBox = document.querySelector(".view-request-box");
        viewRequestBox?.classList.add("active-view-request-box");
        viewRequestBox?.focus();

        return () => {
            viewRequestBox?.classList.remove("active-view-request-box");
        }
    }

    function callApiGetBookingRequests() {
        if (bookingRequests !== null) return;
        callGetRequests();
        setIsLoading(true);

        function callGetRequests() {
            const onGetSuccess = (data) => {
                console.log("Get booking request for view request success:");
                console.log(data);
                setIsLoading(false);
                setBookingRequests(data || []);
            }

            const onGetFailure = (response, status, message) => {
                console.log("Get booking request for view request failed:");
                console.log(response);
                setIsLoading(false);
            }

            bookingApi.getCurrentSlotBookingRequest(onGetSuccess, onGetFailure, slotInfo.id);
        }
    }

    return (
        <div
            tabIndex="0"
            className="view-request-box"
            onKeyDown={handleViewRequestOnKeyDown}
        >
            <div className="box">
                <div className="box__header">
                    <h2 className="box__header__title">View Request</h2>
                    <AiOutlineClose
                        className="box__header__close-icon"
                        onClick={handleCloseViewRequest}
                    />
                </div>
                <div className="box__content">
                    {Array.isArray(bookingRequests) && bookingRequests.length <= 0
                        &&
                        <p className="box__content__empty">
                            No request.
                        </p>
                    }
                    {Array.isArray(bookingRequests) && bookingRequests.length > 0
                        && [...bookingRequests].map(request =>
                            <BookingRequestLecturerView
                                key={`request__${request.id}`}
                                bookingRequest={request}
                            />
                        )
                    }
                </div>
                <div className="box__bottom">
                    <p
                        className="box__bottom__close"
                        tabIndex="0"
                        onClick={handleCloseViewRequest}
                    >
                        Close
                    </p>
                </div>
            </div>
            {isLoading && <Loader />}
        </div>
    );
}

export default ViewRequestBox;