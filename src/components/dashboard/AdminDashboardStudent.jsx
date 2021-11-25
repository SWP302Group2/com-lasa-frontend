import { useEffect, useState } from "react";
import { AiTwotoneSetting } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import majorApi from "../../api/majorApi";
import studentApi from "../../api/studentApi";
import { addLocation } from "../../redux/actions/history";
import { ORDER_BY_DESC } from "../../utils/constant";
import Loader from "../Loader";
import AdminManageStudentBox from "./AdminManageStudentBox";
import PageBar from "./PageBar";
import UserStatusBar from "./UserStatusBar";

function AdminDashboardStudent() {
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(0);
    const [isGettingStudents, setIsGettingStudents] = useState(true);
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isManaging, setIsManaging] = useState(false);
    const [managedStudent, setManagedStudent] = useState(null);

    const [majors, setMajors] = useState([]);
    const [selectedMajor, setSelectedMajor] = useState("");

    const history = useHistory();
    const dispatch = useDispatch();

    function handleOpenManageStudentBox(student) {
        setIsManaging(true);
        setManagedStudent(student);
    }

    function invokeSearch() {
        setIsGettingStudents(true);
    }

    function handleOnClickChangePage(pageIndex) {
        setPage(pageIndex);
        setIsGettingStudents(true);
    }

    function handleSelectedMajorOnChange(event) {
        const value = event.target?.value || "";
        setSelectedMajor(value);
        setIsGettingStudents(true);
    }

    useEffect(function saveLocation() {
        dispatch(addLocation(history?.location?.pathname));
    }, [dispatch, history]);

    useEffect(function activeContent() {
        const studentDashboard = document.querySelector(".admin-dashboard .sidebar__link-student");
        studentDashboard?.classList.add("active-dashboard-content");
        return () => {
            studentDashboard?.classList.remove("active-dashboard-content");
        };
    }, [])

    useEffect(function callApiGetStudents() {
        if (!isGettingStudents) return;
        setIsGettingStudents(false);
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
            studentApi.getStudentsWithPaging(onGetSuccess, onGetFailure, page, selectedMajor, ORDER_BY_DESC);
        }
    }, [page, isGettingStudents, selectedMajor])

    useEffect(function callApiGetMajor() {
        callGetMajors();

        function callGetMajors() {
            const onGetSuccess = (data) => {
                console.log("Dashboard get major success:");
                console.log(data);

                setMajors(data);
            }

            const onGetFailure = (response, status, message) => {
                console.error("Dashboard get major failed:");
                console.error(response);

                setMajors([]);
            }
            majorApi.getMajorsWithoutPaging(onGetSuccess, onGetFailure);
        }
    }, [])

    return (
        <div className="admin-dashboard__content admin-dashboard__student">
            <h3 className="admin-dashboard__content__headline">
                Student Management
            </h3>
            <div className="admin-dashboard__content__panel">
                <select
                    defaultValue={selectedMajor}
                    value={selectedMajor}
                    onChange={handleSelectedMajorOnChange}
                >
                    <option value="">All majors</option>
                    {Array.isArray(majors) && majors.length > 0 && majors.map(major =>
                        <option
                            value={major.id}
                            key={major.id}
                        >
                            {major.id}
                        </option>
                    )}
                </select>
            </div>
            <div className="list">
                <div className="list__headline">
                    <div className="list__headline__th">Id</div>
                    <div className="list__headline__th">Name</div>
                    <div className="list__headline__th">Email</div>
                    <div className="list__headline__th">MSSV</div>
                    <div className="list__headline__th">Status</div>
                    <div className="list__headline__th">Action</div>
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
                            <UserStatusBar
                                status={student.status}
                            />
                        </div>
                        <div className="list__row__td action" title="Change status">
                            <AiTwotoneSetting
                                className="setting-icon"
                                onClick={() => handleOpenManageStudentBox(student)}
                            />
                        </div>
                    </div>
                )}

                {isManaging === true && managedStudent != null &&
                    <AdminManageStudentBox
                        setIsManaging={setIsManaging}
                        student={managedStudent}
                        setManagedStudent={setManagedStudent}
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

export default AdminDashboardStudent;