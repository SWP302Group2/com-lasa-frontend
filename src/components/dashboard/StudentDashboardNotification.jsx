import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addLocation } from "../../redux/actions/history";

function StudentDashboardNotification() {

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(function saveLocation() {
        dispatch(addLocation(history?.location?.pathname));
    }, [dispatch, history]);

    useEffect(() => {
        const slotDashboard = document.querySelector(".student-dashboard .sidebar__link-notification");
        slotDashboard?.classList.add("active-dashboard-content");

        return () => {
            slotDashboard?.classList.remove("active-dashboard-content");
        }
    }, []);

    return (
        <div className="student-dashboard__content student-dashboard__notification">

        </div>
    );
}

export default StudentDashboardNotification;