import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addLocation } from "../../redux/actions/history";

function LecturerDashBoardNotification() {

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(function saveLocation() {
        dispatch(addLocation(history?.location?.pathname));
    }, [dispatch, history]);

    useEffect(() => {
        const slotDashboard = document.querySelector(".lecturer-dashboard .sidebar__link-notification");
        slotDashboard?.classList.add("active-dashboard-content");

        return () => {
            slotDashboard?.classList.remove("active-dashboard-content");
        }
    }, []);

    return (
        <div className="lecturer-dashboard__content lecturer-dashboard__notification">
            <div className="lecturer-dashboard__content__headline">
                <h2 className="lecturer-dashboard__content__headline__title">Notification</h2>
                <p>This feature is under development. Please come back next time.</p>
            </div>
        </div>
    );
}

export default LecturerDashBoardNotification;