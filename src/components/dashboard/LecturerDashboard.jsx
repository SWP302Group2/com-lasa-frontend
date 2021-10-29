import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import "../../assets/css/lecturerDashboard.css"
import LecturerDashboardContent from "./LecturerDashboardContent";

function LecturerDashboard() {

    return (
        <div className="lecturer-dashboard">
            <Sidebar>
                <Link
                    className="sidebar__link sidebar__link-slot "
                    to="/dashboard/slots"
                    title="Slot"
                >
                    <i className="material-icons">receipt</i>
                    <p>Slots</p>
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

            <LecturerDashboardContent />
        </div>
    );
}

export default LecturerDashboard;