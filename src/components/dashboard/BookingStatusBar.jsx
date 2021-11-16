import {
    BOOKING_REQUEST_STATUS_CANCELED,
    BOOKING_REQUEST_STATUS_DENIED,
    BOOKING_REQUEST_STATUS_FINISHED,
    BOOKING_REQUEST_STATUS_NOTIFIED,
    BOOKING_REQUEST_STATUS_READY,
    BOOKING_REQUEST_STATUS_WAITING,
    BOOKING_STATUS_DELETED
} from "../../utils/constant";

function BookingStatusBar({ status }) {

    return (
        <div className="status-bar">
            {status != null && status === BOOKING_REQUEST_STATUS_WAITING &&
                <p className="status-bar__button status-bar__button--waiting">
                    Waiting
                </p>
            }
            {status != null && status === BOOKING_REQUEST_STATUS_READY &&
                <p className="status-bar__button status-bar__button--ready">
                    Ready
                </p>
            }
            {status != null && status === BOOKING_REQUEST_STATUS_CANCELED &&
                <p className="status-bar__button status-bar__button--canceled">
                    Canceled
                </p>
            }
            {status != null && status === BOOKING_REQUEST_STATUS_DENIED &&
                <p className="status-bar__button status-bar__button--denied">
                    Denied
                </p>
            }
            {status != null && status === BOOKING_REQUEST_STATUS_FINISHED &&
                <p className="status-bar__button status-bar__button--finished">
                    Finished
                </p>
            }
            {status != null && status === BOOKING_REQUEST_STATUS_NOTIFIED &&
                <p className="status-bar__button status-bar__button--active">
                    Active
                </p>
            }
            {status != null && status === BOOKING_STATUS_DELETED &&
                <p className="status-bar__button status-bar__button--removed">
                    Removed
                </p>
            }
        </div>
    );
}

export default BookingStatusBar;