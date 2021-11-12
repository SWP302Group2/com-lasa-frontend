import { useEffect } from "react";

function AdminDashboardOverview() {


    useEffect(() => {
        const overviewDashboard = document.querySelector(".admin-dashboard .sidebar__link-overview");
        const start = () => {
            overviewDashboard.classList.add("active-dashboard-content");
        }
        start();

        return () => {
            overviewDashboard.classList.remove("active-dashboard-content");
        }
    }, [])

    return (
        <div className="admin-dashboard__content admin-dashboard__overview">

        </div>
    );
}

export default AdminDashboardOverview;