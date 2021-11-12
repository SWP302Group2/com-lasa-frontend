import { useEffect } from "react";

function LecturerDashBoardNotification() {

    useEffect(() => {
        const slotDashboard = document.querySelector(".lecturer-dashboard .sidebar__link-notification");
        slotDashboard?.classList.add("active-dashboard-content");

        return () => {
            slotDashboard?.classList.remove("active-dashboard-content");
        }
    }, []);

    return (
        <div className="lecturer-dashboard__content lecturer-dashboard__notification">

        </div>
    );
}

export default LecturerDashBoardNotification;