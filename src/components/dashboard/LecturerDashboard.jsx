import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import "../../assets/css/lecturerDashboard.css"
import LecturerDashboardContent from "./LecturerDashboardContent";
import { AiOutlineSchedule } from "react-icons/ai";
import { BiNotification } from "react-icons/bi";
function LecturerDashboard() {

    return (
        <div className="lecturer-dashboard">
            <Sidebar>
                <Link
                    className="sidebar__link sidebar__link-schedule "
                    to="/dashboard/schedule"
                    title="Schedule"
                >
                    <i className="material-icons"><AiOutlineSchedule /></i>
                    <p>Schedule</p>
                </Link>
                <Link
                    className="sidebar__link sidebar__link-notification "
                    to="/dashboard/notifications"
                    title="Notification"
                >
                    <i className="material-icons"><BiNotification /></i>
                    <p>Notification</p>
                </Link>
            </Sidebar>

            <LecturerDashboardContent />
        </div>
    );
}

export default LecturerDashboard;