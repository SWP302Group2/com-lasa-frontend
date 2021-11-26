import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import lecturerApi from "../../api/lecturerApi";
import "../../assets/css/adminManageLecturerBox.css"
import ErrorMessage from "../ErrorMessage";
import Loader from "../Loader";
import SuccessfulMessage from "../SuccessfulMessage";
import UserStatusRadio from "./UserStatusRadio";

function AdminManageLecturerBox({ setIsManaging, setManagedLecturer, lecturer, refresh }) {
    const [newStatus, setNewStatus] = useState(lecturer.status);
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    function handleCloseBox() {
        const createBox = document.querySelector(".admin-manage-lecturer-box");
        createBox?.classList.remove("active-admin-manage-lecturer-box");

        setTimeout(() => {
            if (setIsManaging) setIsManaging(false);
        }, 300);
    }

    function invokeUpdate() {
        if (lecturer.status !== newStatus) {
            setIsUpdatingStatus(true);
        }
    }

    useEffect(activeBox, []);
    function activeBox() {
        const manageBox = document.querySelector(".admin-manage-lecturer-box");
        manageBox?.classList.add("active-admin-manage-lecturer-box");
        manageBox?.focus();
        return () => {
            manageBox?.classList.remove("active-admin-manage-lecturer-box");
        }
    }

    useEffect(function listenApplyButton() {
        const applyButton = document.querySelector(".admin-manage-lecturer-box .box__bottom__apply");
        if (lecturer.status === newStatus) {
            applyButton?.classList.add("disabled-apply");
        }
        if (lecturer.status !== newStatus) {
            applyButton?.classList.remove("disabled-apply");
        }

    }, [lecturer.status, newStatus])

    useEffect(function callApiUpdateStatus() {
        if (!isUpdatingStatus) return;
        setIsUpdatingStatus(false);
        setIsLoading(true);
        updateStatus();

        function updateStatus() {
            const onUpdateSuccess = (data) => {
                console.log("Admin updates lecturer status successful:");
                console.log(data);
                setIsLoading(false);
                if (refresh) refresh();
                if (setManagedLecturer) {
                    setManagedLecturer({ ...data });
                }
                setSuccessMessage("Updated successful.");
            }

            const onUpdateFailure = (response, status, message) => {
                console.error("Admin updates lecturer status failed:");
                console.error(response);
                setIsLoading(false);
                setErrorMessage("Something went wrong, status is not updated. Please try again.");
            }

            lecturerApi.updateStatus(onUpdateSuccess, onUpdateFailure, lecturer.id, newStatus);
        }
    }, [newStatus, isUpdatingStatus, lecturer.id, refresh, setManagedLecturer]);

    return (
        <div className="admin-manage-lecturer-box">
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
                        status={lecturer.status}
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
                    <div>{isLoading && <Loader />}</div>
                </div>
            </div>
        </div>
    );
}

export default AdminManageLecturerBox;