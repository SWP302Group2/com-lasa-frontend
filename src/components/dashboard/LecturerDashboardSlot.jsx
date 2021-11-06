import { useEffect } from 'react';
// import CreateSlotBox from './CreateSlotBox';

function LecturerDashboardSlot() {

    useEffect(() => {
        const slotDashboard = document.querySelector(".lecturer-dashboard .sidebar__link-slot");
        slotDashboard?.classList.add("active-dashboard-content");

        return () => {
            slotDashboard?.classList.remove("active-dashboard-content");
        }
    }, [])
    return (
        <div className="lecturer-dashboard__content lecturer-dashboard__slot">
            <h2 className="lecturer-dashboard__content__headline">
                Schedule
            </h2>
            {/* <BookingRequestList
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
            /> */}
        </div>
    );
}

export default LecturerDashboardSlot;