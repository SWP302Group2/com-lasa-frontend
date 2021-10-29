import { useEffect } from "react";
import { useSelector } from "react-redux";
import "../../assets/css/dashboardContent.css";
import { ADMIN_ROLE, DASHBOARD_PAGE_TITLE, LECTURER_ROLE, STUDENT_ROLE } from "../../utils/constant";
import AdminDashboard from "./AdminDashBoard";
import LecturerDashboard from "./LecturerDashboard";
import StudentDashboard from "./StudentDashboard";

function DashboardContent() {
    const role = useSelector(state => state.user.role)

    useEffect(() => {
        const start = () => {
            const dashboardNavLink = document.querySelector(".navLink-dashboard");
            dashboardNavLink.classList.add("active-navItem");
            document.title = DASHBOARD_PAGE_TITLE;
        }
        start();

        const end = () => {

        }

        return end;
    }, [role])
    return (
        <div className="dashboard-content root-content">
            {role && role === STUDENT_ROLE &&
                <StudentDashboard />
            }
            {role && role === LECTURER_ROLE &&
                <LecturerDashboard />
            }
            {role && role === ADMIN_ROLE &&
                <AdminDashboard />
            }
        </div>
    );
}

export default DashboardContent;