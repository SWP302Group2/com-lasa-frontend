import { useEffect } from "react";
import "../../assets/css/adminManageStudentBox.css"

function AdminManageStudentBox() {

    useEffect(activeBox, []);
    function activeBox() {
        const manageBox = document.querySelector(".admin-manage-student-box");
        manageBox?.classList.add("active-admin-manage-student-box");
        manageBox?.focus();

        return () => {
            manageBox?.classList.remove("active-admin-manage-student-box");
        }
    }

    return (
        <div className="admin-manage-student-box">
            <div className="box">

            </div>
        </div>
    );
}

export default AdminManageStudentBox;