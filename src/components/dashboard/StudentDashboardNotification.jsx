import { useEffect } from "react";

function StudentDashboardNotification() {

    useEffect(() => {
        const slotDashboard = document.querySelector(".student-dashboard .sidebar__link-notification");
        slotDashboard?.classList.add("active-dashboard-content");

        return () => {
            slotDashboard?.classList.remove("active-dashboard-content");
        }
    }, []);

    return (
        <div className="student-dashboard__content student-dashboard__notification">

        </div>
    );
}

export default StudentDashboardNotification;