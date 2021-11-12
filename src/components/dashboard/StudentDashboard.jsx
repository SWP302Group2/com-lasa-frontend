import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import StudentDashboardContent from "./StudentDashboardContent";
import "../../assets/css/studentDashboard.css"
import { BiNotification } from "react-icons/bi";
import { MdRequestPage } from "react-icons/md";
function StudentDashboard() {

    return (
        <div className="student-dashboard">
            <Sidebar>
                <Link
                    className="sidebar__link sidebar__link-booking "
                    to="/dashboard/booking-requests"
                    title="Booking requests"
                >
                    <i><MdRequestPage /></i>
                    <p>Booking requests</p>
                </Link>
                <Link
                    className="sidebar__link sidebar__link-notification "
                    to="/dashboard/notifications"
                    title="Notification"
                >
                    <i><BiNotification /></i>
                    <p>Notification</p>
                </Link>
            </Sidebar>

            <StudentDashboardContent />
        </div>
    );
}

export default StudentDashboard;