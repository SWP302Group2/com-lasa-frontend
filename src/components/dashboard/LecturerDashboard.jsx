import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import "../../assets/css/lecturerDashboard.css"
import LecturerDashboardContent from "./LecturerDashboardContent";
import { AiOutlineSchedule } from "react-icons/ai";
import { BiNotification } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { addLocation } from "../../redux/actions/history";
function LecturerDashboard() {
    const dispatch = useDispatch();

    function handleLinkOnClick(path) {
        dispatch(addLocation(path));
    }

    return (
        <div className="lecturer-dashboard">
            <Sidebar>
                <Link
                    className="sidebar__link sidebar__link-schedule "
                    to="/dashboard/schedule"
                    title="Schedule"
                    onClick={() => handleLinkOnClick("/dashboard/schedule")}
                >
                    <i><AiOutlineSchedule /></i>
                    <p>Schedule</p>
                </Link>
                <Link
                    className="sidebar__link sidebar__link-notification "
                    to="/dashboard/notifications"
                    title="Notification"
                    onClick={() => handleLinkOnClick("/dashboard/notifications")}
                >
                    <i><BiNotification /></i>
                    <p>Notification</p>
                </Link>
            </Sidebar>

            <LecturerDashboardContent />
        </div>
    );
}

export default LecturerDashboard;