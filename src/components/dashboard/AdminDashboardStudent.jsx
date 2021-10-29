import { useEffect, useState } from "react";
import studentApi from "../../api/studentApi";
import PageBar from "./PageBar";
import TableLoadingEffect from "./TableLoadingEffect";

function AdminDashboardStudent() {
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(0);
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function handleOnClickChangePage(pageIndex) {
        setPage(pageIndex);
    }

    useEffect(() => {
        const studentDashboard = document.querySelector(".admin-dashboard .sidebar__link-student");
        const start = () => {
            studentDashboard?.classList.add("active-dashboard-content");
            callGetStudents();
        }
        start();

        const end = () => {
            studentDashboard?.classList.remove("active-dashboard-content");
        }

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

        return end;
    }, [page])
    return (
        <div className="admin-dashboard__content admin-dashboard__student">
            <h3 className="admin-dashboard__content__headline">
                Students Management
            </h3>
            <div className="list">
                <div className="list__headline">
                    <div className="list__headline__th">Id</div>
                    <div className="list__headline__th">Name</div>
                    <div className="list__headline__th">Fpt email</div>
                    <div className="list__headline__th">MSSV</div>
                    <div className="list__headline__th">Phone</div>
                    <div className="list__headline__th">Gender</div>
                    <div className="list__headline__th">Birthday</div>
                    <div className="list__headline__th">Address</div>
                    <div className="list__headline__th">Avatar Url</div>
                    <div className="list__headline__th">Status</div>
                </div>
                {students && students.length > 0 && students.map(student =>
                    <div
                        className="list__row"
                        key={`slot_${student.id}`}
                    >
                        <div className="list__row__td id">{student.id}</div>
                        <div className="list__row__td name">{student.name}</div>
                        <div className="list__row__td email">{student.email}</div>
                        <div className="list__row__td mssv">{student.mssv}</div>
                        <div className="list__row__td phone">{student.phone}</div>
                        <div className="list__row__td gender">{student.gender}</div>
                        <div className="list__row__td birthday">{student.birthday}</div>
                        <div className="list__row__td address">{student.address}</div>
                        <div className="list__row__td avatarUrl">{student.avatarUrl}</div>
                        <div className="list__row__td status">
                            {student.status === 1 && "Active"}
                            {student.status === 0 && "Inactive"}
                            {student.status === -1 && "Banned"}
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

export default AdminDashboardStudent;