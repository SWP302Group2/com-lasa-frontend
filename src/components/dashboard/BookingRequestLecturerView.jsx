
import { MdExpandMore } from "react-icons/md";

function BookingRequestLecturerView({ bookingRequest }) {


    function handleAcceptRequestOnClick() {

    }

    function handleDenyRequestOnClick() {

    }

    return (
        <div
            className="box__request"
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
            </div>
            <div
                className="box__request__more"
                title="Questions"
            >
                <MdExpandMore />
            </div>
        </div>
    );
}

export default BookingRequestLecturerView;