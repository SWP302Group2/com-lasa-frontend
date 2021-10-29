function StudentBookingRequest({ bookingRequest, ...props }) {
    return (
        <div className="booking-request">
            <div className="booking-request__title">
                <p>Title: </p>
                <div>{bookingRequest.title}</div>
            </div>
            <div className="booking-request__topic">
                <p>Topic: </p>
                <div>{bookingRequest.topic?.courseId}</div>
            </div>
            <div className="booking-request__create-time">
                <p>Sent at:</p>
                <div>{`${bookingRequest.createTime.hours?.value}:${bookingRequest.createTime.minutes?.value} ${bookingRequest.createTime.when?.value}`}</div>
                <div>{`${bookingRequest.createTime.date?.name}, ${bookingRequest.createTime.date?.value}/${bookingRequest.createTime.month?.value + 1}`}</div>
            </div>
            <div className="booking-request__lecturer-name">
                <p>Send to: </p>
                <div>{bookingRequest.slot?.lecturer?.name}</div>
            </div>
            <div className="booking-request__timeStart">
                <p>Starts at:</p>
                <div>{`${bookingRequest.slot.timeStart.hours?.value}:${bookingRequest.slot.timeStart.minutes?.value} ${bookingRequest.slot.timeStart.when?.value}`}</div>
                <div>{`${bookingRequest.slot.timeStart.date?.name}, ${bookingRequest.slot.timeStart.date?.value}/${bookingRequest.slot.timeStart.month?.value + 1}`}</div>
            </div>
            {props.children}
        </div>
    );
}

export default StudentBookingRequest;