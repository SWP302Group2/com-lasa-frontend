import { Link } from "react-router-dom"
import "../../assets/css/adminDashboard.css";
import Sidebar from "./Sidebar";
import AdminDashboardContent from "./AdminDashboardContent";
import { useDispatch } from "react-redux";
import { addLocation } from "../../redux/actions/history";
function AdminDashboard() {

    const dispatch = useDispatch();

    function handleLinkOnClick(path) {
        dispatch(addLocation(path));
    }


    return (
        <div className="admin-dashboard">
            <Sidebar>
                <Link
                    className="sidebar__link sidebar__link-overview "
                    to="/dashboard"
                    title="Overview"
                    onClick={() => handleLinkOnClick("/dashboard")}
                >
                    <i className="material-icons">speed</i>
                    <p>Overview</p>
                </Link>
                <Link
                    className="sidebar__link sidebar__link-student "
                    to="/dashboard/students"
                    title="Students"
                    onClick={() => handleLinkOnClick("/dashboard/students")}
                >
                    <i className="material-icons">school</i>
                    <p>Students</p>
                </Link>
                <Link
                    className="sidebar__link sidebar__link-lecturer "
                    to="/dashboard/lecturers"
                    title="Lecturers"
                    onClick={() => handleLinkOnClick("/dashboard/lecturers")}
                >
                    <i className="material-icons">badge</i>
                    <p>Lecturers</p>
                </Link>
                <Link
                    className="sidebar__link sidebar__link-major-topic "
                    to="/dashboard/majors-topics"
                    title="Majors and Topics"
                    onClick={() => handleLinkOnClick("/dashboard/majors-topics")}
                >
                    <i className="material-icons">topic</i>
                    <p>Majors and Topics</p>
                </Link>
                <Link
                    className="sidebar__link sidebar__link-slot "
                    to="/dashboard/slots"
                    title="Slots"
                    onClick={() => handleLinkOnClick("/dashboard/slots")}
                >
                    <i className="material-icons">receipt</i>
                    <p>Slots</p>
                </Link>
                <Link
                    className="sidebar__link sidebar__link-booking "
                    to="/dashboard/booking-requests"
                    title="Booking requests"
                    onClick={() => handleLinkOnClick("/dashboard/booking-requests")}
                >
                    <i className="material-icons">request_quote</i>
                    <p>Booking requests</p>
                </Link>
            </Sidebar>

            <AdminDashboardContent />
        </div>
    );
}

export default AdminDashboard;