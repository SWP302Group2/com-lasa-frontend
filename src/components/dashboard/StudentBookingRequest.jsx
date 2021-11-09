import {
    BOOKING_REQUEST_STATUS_CANCELED,
    BOOKING_REQUEST_STATUS_DENIED,
    BOOKING_REQUEST_STATUS_FINISHED,
    BOOKING_REQUEST_STATUS_NOTIFIED,
    BOOKING_REQUEST_STATUS_READY,
    BOOKING_REQUEST_STATUS_WAITING
} from "../../utils/constant";
import { MdEditNote } from "react-icons/md";
import { useState } from "react";
import EditBookingRequestBox from "./EditBookingRequestBox";

function StudentBookingRequest({ bookingRequest, status, callRefresh }) {
    const [isActiveEdit, setIsActiveEdit] = useState(false);

    function closeEditBox() {
        setIsActiveEdit(false);
    }

    function activeEditBookingRequest() {
        setIsActiveEdit(true);
    }

    if (status !== 0 && !status) return null;

    if (status === BOOKING_REQUEST_STATUS_WAITING)
        return (
            <>
                <div className="booking-request">
                    <div
                        title="Edit"
                        className="booking-request__more-detail"
                        onClick={activeEditBookingRequest}
                    >
                        <MdEditNote />
                    </div>
                    <div className="booking-request__lecturer-name">
                        <p>Sent to</p>
                        <div>{bookingRequest.slot?.lecturer?.name}</div>
                    </div>
                    <div className="booking-request__topic">
                        <p>Request topic</p>
                        <div>{bookingRequest.topic.courseId}</div>
                    </div>
                    <div className="booking-request__time-start">
                        <p>Slot starts at</p>
                        <div>
                            <div>{bookingRequest.slot.timeStart.getTimeString()}</div>
                            <div>{bookingRequest.slot.timeStart.getDateString()}</div>
                        </div>
                    </div>
                </div>
                {isActiveEdit &&
                    <EditBookingRequestBox
                        bookingRequest={bookingRequest}
                        bookingStatus={status}
                        closeEditCallBack={closeEditBox}
                        callRefresh={callRefresh}
                    />}
            </>
        );

    if (status === BOOKING_REQUEST_STATUS_READY || status === BOOKING_REQUEST_STATUS_NOTIFIED)
        return (
            <>
                <div className="booking-request">
                    <div
                        title="Edit"
                        className="booking-request__more-detail"
                        onClick={activeEditBookingRequest}
                    >
                        <MdEditNote />
                    </div>
                    <div className="booking-request__lecturer-name">
                        <p>Lecturer</p>
                        <div>{bookingRequest.slot?.lecturer?.name}</div>
                    </div>
                    <div className="booking-request__time-start">
                        <p>Slot starts at</p>
                        <div>
                            <div>{bookingRequest.slot.timeStart.getTimeString()}</div>
                            <div>{bookingRequest.slot.timeStart.getDateString()}</div>
                        </div>
                    </div>
                    <div className="booking-request__meeting-url">
                        <a href={bookingRequest.slot.lecturer?.meetingUrl}>Go meeting</a>
                    </div>
                </div>
                {isActiveEdit &&
                    <EditBookingRequestBox
                        bookingRequest={bookingRequest}
                        bookingStatus={status}
                        closeEditCallBack={closeEditBox}
                        callRefresh={callRefresh}
                    />}
            </>
        );

    if (status === BOOKING_REQUEST_STATUS_DENIED)
        return (
            <>
                <div className="booking-request">
                    <div
                        title="Edit"
                        className="booking-request__more-detail"
                        onClick={activeEditBookingRequest}
                    >
                        <MdEditNote />
                    </div>
                    <div className="booking-request__create-time">
                        <p>Sent request at</p>
                        <div>
                            <div>{bookingRequest.createTime.getTimeString()}</div>
                            <div>{bookingRequest.createTime.getDateString()}</div>
                        </div>
                    </div>

                    <div className="booking-request__lecturer-name">
                        <p>Denied by</p>
                        <div>{bookingRequest.slot?.lecturer?.name}</div>
                    </div>
                </div>
                {isActiveEdit &&
                    <EditBookingRequestBox
                        bookingRequest={bookingRequest}
                        bookingStatus={status}
                        closeEditCallBack={closeEditBox}
                        callRefresh={callRefresh}
                    />}
            </>
        );

    if (status === BOOKING_REQUEST_STATUS_CANCELED)
        return (
            <>
                <div className="booking-request">
                    <div
                        title="Edit"
                        className="booking-request__more-detail"
                        onClick={activeEditBookingRequest}
                    >
                        <MdEditNote />
                    </div>
                    <div className="booking-request__create-time">
                        <p>Sent request at</p>
                        <div>
                            <div>{bookingRequest.createTime.getTimeString()}</div>
                            <div>{bookingRequest.createTime.getDateString()}</div>
                        </div>
                    </div>
                    <div className="booking-request__lecturer-name">
                        <p>Sent to</p>
                        <div>{bookingRequest.slot?.lecturer?.name}</div>
                    </div>
                </div>
                {isActiveEdit &&
                    <EditBookingRequestBox
                        bookingRequest={bookingRequest}
                        bookingStatus={status}
                        closeEditCallBack={closeEditBox}
                        callRefresh={callRefresh}
                    />}
            </>
        );

    if (status === BOOKING_REQUEST_STATUS_FINISHED)
        return (
            <>
                <div className="booking-request">
                    <div
                        title="Edit"
                        className="booking-request__more-detail"
                        onClick={activeEditBookingRequest}
                    >
                        <MdEditNote />
                    </div>
                    <div className="booking-request__create-time">
                        <p>Sent request at</p>
                        <div>
                            <div>{bookingRequest.createTime.getTimeString()}</div>
                            <div>{bookingRequest.createTime.getDateString()}</div>
                        </div>
                    </div>

                    <div className="booking-request__lecturer-name">
                        <p>Send to</p>
                        <div>{bookingRequest.slot?.lecturer?.name}</div>
                    </div>
                    <div className="booking-request__time-end">
                        <p>Finished at</p>
                        <div>
                            <div>{bookingRequest.slot.timeEnd.getTimeString()}</div>
                            <div>{bookingRequest.slot.timeEnd.getDateString()}</div>
                        </div>
                    </div>
                </div>
                {isActiveEdit &&
                    <EditBookingRequestBox
                        bookingRequest={bookingRequest}
                        bookingStatus={status}
                        closeEditCallBack={closeEditBox}
                        callRefresh={callRefresh}
                    />}
            </>
        );
    return null;
}

export default StudentBookingRequest;