import { useEffect, useState } from "react";
import { AiTwotoneSetting } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import studentApi from "../../api/studentApi";
import { addLocation } from "../../redux/actions/history";
import Loader from "../Loader";
import AdminManageStudentBox from "./AdminManageStudentBox";
import PageBar from "./PageBar";

function AdminDashboardStudent() {
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(0);
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isManaging, setIsManaging] = useState(false);
    const [managedStudent, setManagedStudent] = useState(null);

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(function saveLocation() {
        dispatch(addLocation(history?.location?.pathname));
    }, [dispatch, history]);

    function handleOnClickChangePage(pageIndex) {
        setPage(pageIndex);
    }

    useEffect(() => {
        const studentDashboard = document.querySelector(".admin-dashboard .sidebar__link-student");
        studentDashboard?.classList.add("active-dashboard-content");
        callGetStudents();

        function callGetStudents() {
            const onGetSuccess = (data) => {
                console.log("Dashboard get students success:");
                console.log(data);

                setIsLoading(false);
                if (data.number !== page) return;

                setStudents(data.content);
                setTotalPages(data.totalPages);
            }

            const onGetFailure = (response, status, message) => {
                console.log("Dashboard get student failed:");
                console.log(response);
                setStudents(null);
                setIsLoading(false);
            }

            setIsLoading(true);
            studentApi.getStudentsWithPaging(page, onGetSuccess, onGetFailure);
        }

        return () => {
            studentDashboard?.classList.remove("active-dashboard-content");
        };
    }, [page])

    function handleOpenManageStudentBox(student) {
        setIsManaging(true);
        setManagedStudent(student);
    }

    return (
        <div className="admin-dashboard__content admin-dashboard__student">
            <h3 className="admin-dashboard__content__headline">
                Students
            </h3>
            <div className="list">
                <div className="list__headline">
                    <div className="list__headline__th">Id</div>
                    <div className="list__headline__th">Name</div>
                    <div className="list__headline__th">Fpt email</div>
                    <div className="list__headline__th">MSSV</div>
                    <div className="list__headline__th">Status</div>
                    <div className="list__headline__th">Manage</div>
                </div>
                {students && students.length > 0 && students.map(student =>
                    <div
                        className="list__row"
                        key={`slot_${student.id}`}
                        tabIndex="0"
                    >
                        <div className="list__row__td id">{student.id}</div>
                        <div className="list__row__td name">{student.name}</div>
                        <div className="list__row__td email">{student.email}</div>
                        <div className="list__row__td mssv">{student.mssv}</div>
                        <div className="list__row__td status">
                            {student.status === 1 && "Active"}
                            {student.status === 0 && "Inactive"}
                            {student.status === -1 && "Banned"}
                        </div>
                        <div className="list__row__td manage">
                            <AiTwotoneSetting
                                onClick={() => handleOpenManageStudentBox(student)}
                            />
                        </div>
                    </div>
                )}

                {isManaging === true && managedStudent != null &&
                    <AdminManageStudentBox
                        setIsManaging={setIsManaging}
                        student={managedStudent}
                    />
                }
                {isLoading ? <Loader /> : null}
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

export default AdminDashboardStudent;