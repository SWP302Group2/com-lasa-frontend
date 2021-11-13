import { useEffect, useState } from "react";
import { AiTwotoneSetting } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import lecturerApi from "../../api/lecturerApi";
import { addLocation } from "../../redux/actions/history";
import PageBar from "./PageBar";
import TableLoadingEffect from "./TableLoadingEffect";

function AdminDashboardLecturer() {
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(0);
    const [lecturers, setLecturers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(function saveLocation() {
        dispatch(addLocation(history?.location?.pathname));
    }, [dispatch, history]);

    function handleOnClickChangePage(pageIndex) {
        setPage(pageIndex);
    }

    useEffect(() => {
        const lecturerDashboard = document.querySelector(".admin-dashboard .sidebar__link-lecturer");
        const start = () => {
            lecturerDashboard?.classList.add("active-dashboard-content");
            callGetLecturer();
        }
        start();

        const end = () => {
            lecturerDashboard?.classList.remove("active-dashboard-content");
        }

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
                console.log("Dashboard get student failed:");
                console.log(response);
                setLecturers(null);
                setIsLoading(false);
            }

            setIsLoading(true);
            lecturerApi.getLecturersWithPaging(page, onGetSuccess, onGetFailure);
        }

        return end;
    }, [page])
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
                    <div className="list__headline__th">Manage</div>
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
                            {lecturer.status === 1 && "Active"}
                            {lecturer.status === 0 && "Inactive"}
                            {lecturer.status === -1 && "Banned"}
                        </div>
                        <div className="list__row__td manage">
                            <AiTwotoneSetting />
                        </div>
                    </div>
                )}
                {isLoading ? <TableLoadingEffect /> : null}
            </div>
            {totalPages && totalPages > 0 &&
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