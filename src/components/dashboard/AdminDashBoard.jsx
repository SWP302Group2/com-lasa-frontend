import { useEffect } from "react";
import { Link } from "react-router-dom"
import "../../assets/css/adminDashboard.css";
import Sidebar from "./Sidebar";
import AdminDashboardContent from "./AdminDashboardContent";
function AdminDashboard() {

    useEffect(() => {

    }, [])

    return (
        <div className="admin-dashboard">
            <Sidebar>
                <Link className="sidebar__link sidebar__link-overview " to="/dashboard" title="Overview">
                    <i className="material-icons">speed</i>
                    <p>Overview</p>
                </Link>
                <Link className="sidebar__link sidebar__link-slot " to="/dashboard/slots" title="Slots">
                    <i className="material-icons">receipt</i>
                    <p>Slots</p>
                </Link>
                <Link className="sidebar__link sidebar__link-booking " to="/dashboard/booking-requests" title="Booking requests">
                    <i className="material-icons">request_quote</i>
                    <p>Booking requests</p>
                </Link>
                <Link className="sidebar__link sidebar__link-major-topic " to="/dashboard/majors-topics" title="Majors and Topics">
                    <i className="material-icons">topic</i>
                    <p>Majors and Topics</p>
                </Link>
                <Link className="sidebar__link sidebar__link-student " to="/dashboard/students" title="Students">
                    <i className="material-icons">school</i>
                    <p>Students</p>
                </Link>
                <Link className="sidebar__link sidebar__link-lecturer " to="/dashboard/lecturers" title="Lecturers">
                    <i className="material-icons">badge</i>
                    <p>Lecturers</p>
                </Link>
            </Sidebar>

            <AdminDashboardContent />
        </div>
    );
}

export default AdminDashboard;