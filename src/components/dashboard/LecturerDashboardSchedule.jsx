import { useCallback, useEffect, useState } from "react";
import SchedulerArea from "./SchedulerArea";
import slotApi from "../../api/slotApi";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import { IoMdRefresh } from "react-icons/io";
import { useHistory } from "react-router-dom";
import { addLocation } from "../../redux/actions/history";


function LecturerDashboardSchedule() {
    const [slots, setSlots] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const userId = useSelector(state => state.user.id);
    const [reFreshSlots, setRefreshSlots] = useState(false);


    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(function saveLocation() {
        dispatch(addLocation(history?.location?.pathname));
    }, [dispatch, history]);

    const changeTitleAndActiveScheduleLink = useCallback(() => {
        const slotDashboard = document.querySelector(".lecturer-dashboard .sidebar__link-schedule");
        slotDashboard?.classList.add("active-dashboard-content");

        return () => {
            slotDashboard?.classList.remove("active-dashboard-content");
        }
    }, []);

    const getCurrentUserSlots = useCallback(() => {
        let isMounted = true;
        callGetSlots();
        setIsLoading(true);

        function callGetSlots() {
            const onGetSuccess = (data) => {
                console.log("Get current use slot success:")
                console.log(data);
                setIsLoading(false);

                setSlots(data);
            }

            const onGetFailure = (response, status, message) => {
                console.log("Get current use slot failed:")
                console.log(response);
                setIsLoading(false);

                setTimeout(() => {
                    if (!isMounted) return;

                    setRefreshSlots(true);
                }, 1000);
            }

            slotApi.getCurrentUserSlot(onGetSuccess, onGetFailure, userId);
        }
        return () => {
            isMounted = false;
        }
    }, [userId]);

    const recallGetSlots = useCallback(() => {
        if (reFreshSlots !== true) return;
        setIsLoading(true);
        setRefreshSlots(false);
        getCurrentUserSlots();
    }, [reFreshSlots, getCurrentUserSlots])

    useEffect(changeTitleAndActiveScheduleLink, [changeTitleAndActiveScheduleLink]);
    useEffect(getCurrentUserSlots, [userId, getCurrentUserSlots]);
    useEffect(recallGetSlots, [reFreshSlots, recallGetSlots]);

    function handleCallRefreshSlots() {
        setRefreshSlots(true);
        setIsLoading(true);
    }

    return (
        <div className="lecturer-dashboard__content lecturer-dashboard__schedule">
            <div className="lecturer-dashboard__content__headline">
                <h2 className="lecturer-dashboard__content__headline__title">Schedule</h2>
                <IoMdRefresh
                    className="refresh"
                    title="Refresh"
                    onClick={handleCallRefreshSlots}
                />
            </div>
            {slots &&
                <SchedulerArea
                    refreshCallback={handleCallRefreshSlots}
                    slots={slots}
                    setSlots={setSlots}
                />
            }
            {isLoading && <Loader />}
        </div>
    );
}

export default LecturerDashboardSchedule;