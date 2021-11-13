
import { useEffect, useState } from "react";
import { RiMore2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import slotApi from "../../api/slotApi";
import { BOOKING_REQUEST_STATUS_NOTIFIED, BOOKING_REQUEST_STATUS_READY, BOOKING_REQUEST_STATUS_WAITING } from "../../utils/constant";
import ShowQuestionBox from "./ShowQuestionBox";

function BookingRequestLecturerView({ bookingRequest, setIsLoading, invokeRefresh }) {
    const [isAccepted, setIsAccepted] = useState(false);
    const [isDenied, setIsDenied] = useState(false);
    const [showQuestion, setShowQuestion] = useState(false);

    const user = useSelector(state => state.user)

    function handleAcceptRequestOnClick() {
        setIsAccepted(true);
    }

    function handleDenyRequestOnClick() {
        setIsDenied(true);
    }

    useEffect(callApiLecturerAcceptRequest, [isAccepted, setIsLoading, bookingRequest, user, invokeRefresh]);
    useEffect(callApiLecturerDeniedRequest, [isDenied, setIsLoading, bookingRequest, user, invokeRefresh]);

    function callApiLecturerAcceptRequest() {
        if (!isAccepted) return;
        setIsLoading(true);
        setIsAccepted(false);

        const onAcceptSuccess = (data) => {
            console.log("Lecturer accepts request success:")
            console.log(data);
            setIsLoading(false);
            invokeRefresh();
        }

        const onAcceptFailure = (response, status, message) => {
            console.log("Lecturer accepts request failed:")
            console.log(response);
            setIsLoading(false);
            invokeRefresh();
        }

        slotApi.acceptARequest(onAcceptSuccess, onAcceptFailure, user.id, bookingRequest.id, bookingRequest.slotId);
    }

    function callApiLecturerDeniedRequest() {
        if (!isDenied) return;
        setIsLoading(true);
        setIsDenied(false);

        const onDenySuccess = (data) => {
            console.log("Lecturer denies request success:")
            console.log(data);
            setIsLoading(false);
            invokeRefresh();
        }

        const onDenyFailure = (response, status, message) => {
            console.log("Lecturer denies request failed:")
            console.log(response);
            setIsLoading(false);
            invokeRefresh();
        }

        slotApi.denyARequest(onDenySuccess, onDenyFailure, user.id, bookingRequest.id, bookingRequest.slotId);
    }

    function handleExpendMoreOnClick() {
        setShowQuestion(!showQuestion);
    }

    return (
        <div
            className={`box__request box__request__${bookingRequest.id}`}
        >
            <div className="box__request__avatar">
                <img
                    src={bookingRequest.student.avatarUrl} alt="avatar"
                    width="50" height="50"
                />
            </div>
            <div className="box__request__name">
                {bookingRequest.student.name}
            </div>
            <div className="box__request__actions">
                {
                    bookingRequest?.status === BOOKING_REQUEST_STATUS_WAITING &&
                    <>
                        <p
                            className="box__request__accept"
                            onClick={handleAcceptRequestOnClick}
                        >
                            Accept
                        </p>
                        <p
                            className="box__request__deny"
                            onClick={handleDenyRequestOnClick}
                        >
                            Deny
                        </p>
                    </>
                }
                {
                    (bookingRequest?.status === BOOKING_REQUEST_STATUS_READY ||
                        bookingRequest?.status === BOOKING_REQUEST_STATUS_NOTIFIED) &&
                    <p>Accepted</p>
                }
            </div>
            <div
                className="box__request__more"
                title="Questions"
            >
                <RiMore2Fill
                    className="icon"
                    onClick={handleExpendMoreOnClick}
                />
            </div>
            {showQuestion === true &&
                <ShowQuestionBox
                    bookingRequest={bookingRequest}
                    setShowQuestion={setShowQuestion}
                />
            }
        </div>
    );
}

export default BookingRequestLecturerView;