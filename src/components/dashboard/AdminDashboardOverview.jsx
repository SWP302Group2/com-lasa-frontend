import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
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

        </div>
    );
}

export default AdminDashboardOverview;