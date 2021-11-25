import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import majorApi from "../../api/majorApi";
import { addLocation } from "../../redux/actions/history";
import Loader from "../Loader";
import MajorBar from "./MajorBar";
import MajorPanel from "./MajorPanel";

function AdminDashboardMajorAndTopic() {
    const [isLoading, setIsLoading] = useState(false);
    const [majors, setMajors] = useState([]);

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(function saveLocation() {
        dispatch(addLocation(history?.location?.pathname));
    }, [dispatch, history]);


    useEffect(function activeContent() {
        const majorDashboard = document.querySelector(".admin-dashboard .sidebar__link-major-topic");
        majorDashboard?.classList.add("active-dashboard-content");
        return () => {
            majorDashboard?.classList.remove("active-dashboard-content");
        };
    }, [])

    useEffect(function callApiGetMajor() {
        setIsLoading(true);
        callGetMajors();

        function callGetMajors() {
            const onGetSuccess = (data) => {
                console.log("Dashboard get major success:");
                console.log(data);

                setIsLoading(false);
                setMajors(data);
            }

            const onGetFailure = (response, status, message) => {
                console.error("Dashboard get major failed:");
                console.error(response);

                setIsLoading(false);
                setMajors([]);
            }
            majorApi.getMajorsWithoutPaging(onGetSuccess, onGetFailure);
        }
    }, [])

    return (
        <div className="admin-dashboard__content admin-dashboard__majors-topics">
            <h3 className="admin-dashboard__content__headline">
                Majors
            </h3>
            <MajorPanel />
            {Array.isArray(majors) && majors.length > 0 &&
                majors.map((major, index) =>
                    <MajorBar
                        key={`major-bar__${major.id || index}`}
                        major={major}
                    />
                )
            }
            {isLoading && <Loader />}
        </div>
    );
}

export default AdminDashboardMajorAndTopic;