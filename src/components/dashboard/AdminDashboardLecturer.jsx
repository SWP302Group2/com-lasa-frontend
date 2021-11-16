import { useEffect, useState } from "react";
import { AiTwotoneSetting } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import lecturerApi from "../../api/lecturerApi";
import { addLocation } from "../../redux/actions/history";
import Loader from "../Loader";
import AdminManageLecturerBox from "./AdminManageLecturerBox";
import PageBar from "./PageBar";
import UserStatusBar from "./UserStatusBar";

function AdminDashboardLecturer() {
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(0);
    const [lecturers, setLecturers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isGettingLecturers, setIsGettingLecturers] = useState(true);
    const [isManaging, setIsManaging] = useState(false);
    const [managedLecturer, setManagedLecturer] = useState(null);

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(function saveLocation() {
        dispatch(addLocation(history?.location?.pathname));
    }, [dispatch, history]);

    function handleOnClickChangePage(pageIndex) {
        setPage(pageIndex);
        setIsGettingLecturers(true);
    }

    function handleOpenManageLecturerBox(lecturer) {
        setIsManaging(true);
        setManagedLecturer(lecturer);
    }

    function invokeSearch() {
        setIsGettingLecturers(true);
    }


    useEffect(function activeContent() {
        const lecturerDashboard = document.querySelector(".admin-dashboard .sidebar__link-lecturer");
        lecturerDashboard?.classList.add("active-dashboard-content");
        return () => {
            lecturerDashboard?.classList.remove("active-dashboard-content");
        };
    }, [])

    useEffect(function callApiGetLecturer() {
        if (!isGettingLecturers) return;
        setIsLoading(true);
        setIsGettingLecturers(false);
        callGetLecturer();

        function callGetLecturer() {
            const onGetSuccess = (data) => {
                console.log("Dashboard get Lecturers success:");
                console.log(data);

                setIsLoading(false);
                if (data.number !== page) return;

                setLecturers(data.content);
                setTotalPages(data.totalPages);
            }

            const onGetFailure = (response, status, message) => {
                console.log("Dashboard get lecturer failed:");
                console.log(response);
                setLecturers(null);
                setIsLoading(false);
            }

            lecturerApi.getLecturersWithPaging(onGetSuccess, onGetFailure, page);
        }
    }, [page, isGettingLecturers])

    return (
        <div className="admin-dashboard__content admin-dashboard__lecturer">
            <h3 className="admin-dashboard__content__headline">
                Lecturer Management
            </h3>
            <div className="list">
                <div className="list__headline">
                    <div className="list__headline__th">Id</div>
                    <div className="list__headline__th">Name</div>
                    <div className="list__headline__th">Fpt email</div>
                    <div className="list__headline__th">Status</div>
                    <div className="list__headline__th">Action</div>
                </div>
                {lecturers && lecturers.length > 0 && lecturers.map(lecturer =>
                    <div
                        className="list__row"
                        key={`slot_${lecturer.id}`}
                        tabIndex="0"
                    >
                        <div className="list__row__td id">{lecturer.id}</div>
                        <div className="list__row__td name">{lecturer.name}</div>
                        <div className="list__row__td email">{lecturer.email}</div>
                        <div className="list__row__td status">
                            <UserStatusBar
                                status={lecturer.status}
                            />
                        </div>
                        <div className="list__row__td action" title="Change status">
                            <AiTwotoneSetting
                                className="setting-icon"
                                onClick={() => handleOpenManageLecturerBox(lecturer)}
                            />
                        </div>
                    </div>
                )}
                {isManaging === true && managedLecturer != null &&
                    <AdminManageLecturerBox
                        setIsManaging={setIsManaging}
                        lecturer={managedLecturer}
                        setManagedLecturer={setManagedLecturer}
                        refresh={invokeSearch}
                    />
                }
                {isLoading ? <Loader /> : null}
            </div>
            {totalPages != null && totalPages > 0 &&
                <PageBar
                    currentPage={page}
                    totalPages={totalPages}
                    callBack={handleOnClickChangePage}
                />
            }
        </div>
    );
}

export default AdminDashboardLecturer;