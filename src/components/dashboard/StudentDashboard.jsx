import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import StudentDashboardContent from "./StudentDashboardContent";
import "../../assets/css/studentDashboard.css"
function StudentDashboard() {

    return (
        <div className="student-dashboard">
            <Sidebar>
                <Link
                    className="sidebar__link sidebar__link-booking "
                    to="/dashboard/booking-requests"
                    title="Booking requests"
                >
                    <i className="material-icons">request_quote</i>
                    <p>Booking requests</p>
                </Link>
                <Link
                    className="sidebar__link sidebar__link-notification "
                    to="/dashboard/notifications"
                    title="Notification"
                >
                    <i className="material-icons">notifications</i>
                    <p>Notification</p>
                </Link>
            </Sidebar>

            <StudentDashboardContent />
        </div>
    );
}

export default StudentDashboard;