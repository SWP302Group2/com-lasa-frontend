import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import studentApi from "../../api/studentApi";
import "../../assets/css/adminManageStudentBox.css"
import ErrorMessage from "../ErrorMessage";
import Loader from "../Loader";
import SuccessfulMessage from "../SuccessfulMessage";
import UserStatusRadio from "./UserStatusRadio";

function AdminManageStudentBox({ setIsManaging, setManagedStudent, student, refresh }) {
    const [newStatus, setNewStatus] = useState(student.status);
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    function handleCloseBox() {
        const createBox = document.querySelector(".admin-manage-student-box");
        createBox?.classList.remove("active-admin-manage-student-box");

        setTimeout(() => {
            if (setIsManaging) setIsManaging(false);
        }, 300);
    }

    function invokeUpdate() {
        if (student.status !== newStatus) {
            setIsUpdatingStatus(true);
        }
    }

    useEffect(activeBox, []);
    function activeBox() {
        const manageBox = document.querySelector(".admin-manage-student-box");
        manageBox?.classList.add("active-admin-manage-student-box");
        manageBox?.focus();
        return () => {
            manageBox?.classList.remove("active-admin-manage-student-box");
        }
    }

    useEffect(function listenApplyButton() {
        const applyButton = document.querySelector(".admin-manage-student-box .box__bottom__apply");
        if (student.status === newStatus) {
            applyButton?.classList.add("disabled-apply");
        }
        if (student.status !== newStatus) {
            applyButton?.classList.remove("disabled-apply");
        }

    }, [student.status, newStatus])

    useEffect(function callApiUpdateStatus() {
        if (!isUpdatingStatus) return;
        setIsUpdatingStatus(false);
        setIsLoading(true);
        updateStatus();

        function updateStatus() {
            const onUpdateSuccess = (data) => {
                console.log("Admin updates student status successful:");
                console.log(data);
                setIsLoading(false);
                if (refresh) refresh();
                if (setManagedStudent) {
                    setManagedStudent({ ...data });
                }
                setSuccessMessage("Updated successful.");
            }

            const onUpdateFailure = (response, status, message) => {
                console.error("Admin updates student status failed:");
                console.error(response);
                setIsLoading(false);
                setErrorMessage("Something went wrong, status is not updated. Please try again.");
            }

            studentApi.updateStatus(onUpdateSuccess, onUpdateFailure, student.id, newStatus);
        }
    }, [newStatus, isUpdatingStatus, student.id, refresh, setManagedStudent]);

    return (
        <div className="admin-manage-student-box">
            <div className="box">
                <div className="box__header">
                    <h2 className="box__header__title">Account setting</h2>
                    <AiOutlineClose
                        className="box__header__close-icon"
                        onClick={handleCloseBox}
                    />
                </div>
                <div className="box__content">
                    <UserStatusRadio
                        status={student.status}
                        newStatus={newStatus}
                        setNewStatus={setNewStatus}
                    />
                </div>
                {errorMessage && <ErrorMessage message={errorMessage} />}
                {successMessage && <SuccessfulMessage message={successMessage} />}
                <div className="box__bottom">
                    <p
                        className="box__bottom__apply"
                        tabIndex="0"
                        onClick={invokeUpdate}
                    >
                        Apply
                    </p>
                    <p
                        className="box__bottom__close"
                        tabIndex="0"
                        onClick={handleCloseBox}
                    >
                        Close
                    </p>
                </div>
                {isLoading && <Loader />}
            </div>
        </div>
    );
}

export default AdminManageStudentBox;