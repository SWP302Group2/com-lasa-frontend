import { IoMdRefresh } from "react-icons/io";
import { MdExpandLess } from "react-icons/md";

function BookingRequestListHeader({ title, status, callRefresh }) {

    function handleDisplayBookingRequestList(event) {
        const bookingList = document.querySelector(`.student-dashboard .booking-list__content--${status}`);
        bookingList?.classList.toggle("hide-booking-list-content");
        console.log('clicked')
        event.target?.classList.toggle("rotate-180");
    }

    return (
        <div className="booking-list__header">
            <h3 className={`booking-list__title booking-list__title--${status}`}>
                {title}
            </h3>
            <div className="booking-list__panel">
                <IoMdRefresh className="refresh" onClick={callRefresh} />
                <MdExpandLess className="expand-more" onClick={handleDisplayBookingRequestList} />
            </div>
        </div>
    );
}

export default BookingRequestListHeader;