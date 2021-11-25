import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { addLocation } from "../../redux/actions/history";

function AdminDashboardOverview() {

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(function saveLocation() {
        dispatch(addLocation(history?.location?.pathname));
    }, [dispatch, history]);

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
            <h3 className="admin-dashboard__content__headline">
                Overview
            </h3>

            <div className="overview-container">
                <div className="minimal-dashboard minimal-dashboard--student">
                    <div className="minimal-dashboard__header">
                        <i className="material-icons">school</i>
                        <p>Students</p>
                    </div>
                    <div className="minimal-dashboard__content">

                    </div>
                    <Link to="/dashboard/students" className="minimal-dashboard__bottom">
                        <i className="material-icons">arrow_forward</i>
                        <p>Go to Students dashboard</p>
                    </Link>
                </div>
                <div className="minimal-dashboard minimal-dashboard--lecturer">
                    <div className="minimal-dashboard__header">
                        <i className="material-icons">badge</i>
                        <p>Lecturers</p>
                    </div>
                    <div className="minimal-dashboard__content">

                    </div>
                    <Link to="/dashboard/lecturers" className="minimal-dashboard__bottom">
                        <i className="material-icons">arrow_forward</i>
                        <p>Go to Lecturers dashboard</p>
                    </Link>
                </div>
                <div className="minimal-dashboard minimal-dashboard--slot">
                    <div className="minimal-dashboard__header">
                        <i className="material-icons">receipt</i>
                        <p>Slots</p>
                    </div>
                    <div className="minimal-dashboard__content">

                    </div>
                    <Link to="/dashboard/slots" className="minimal-dashboard__bottom">
                        <i className="material-icons">arrow_forward</i>
                        <p>Go to Slots dashboard</p>
                    </Link>
                </div>
                <div className="minimal-dashboard minimal-dashboard--booking">
                    <div className="minimal-dashboard__header">
                        <i className="material-icons">request_quote</i>
                        <p>Booking requests</p>
                    </div>
                    <div className="minimal-dashboard__content">

                    </div>
                    <Link to="/dashboard/booking-requests" className="minimal-dashboard__bottom">
                        <i className="material-icons">arrow_forward</i>
                        <p>Go to Booking requests dashboard</p>
                    </Link>
                </div>
                <div className="minimal-dashboard minimal-dashboard--major-topic">
                    <div className="minimal-dashboard__header">
                        <i className="material-icons">topic</i>
                        <p>Majors and Topics</p>
                    </div>
                    <div className="minimal-dashboard__content">

                    </div>
                    <Link to="/dashboard/majors-topics" className="minimal-dashboard__bottom">
                        <i className="material-icons">arrow_forward</i>
                        <p>Go to Majors and Topics dashboard</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboardOverview;