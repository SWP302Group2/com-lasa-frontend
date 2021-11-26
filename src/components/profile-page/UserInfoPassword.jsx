import { useEffect, useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import adminApi from "../../api/adminApi";
import { updateUserInfo } from "../../redux/actions/user";
import { ADMIN_ROLE } from "../../utils/constant";
import ErrorMessage from "../ErrorMessage";
import Loader from "../Loader";
import SuccessfulMessage from "../SuccessfulMessage";

function UserInfoPassword() {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    function handleEditOnClick() {
        enableEdit();
    }

    function handleEditOnKeydown(event) {
        if (event.key !== "Escape") return;
        enableEdit();
    }

    function enableEdit() {
        if (!user.role) return;
        setIsEditing(true);
        setNewPassword("");
        setConfirm("");
    }

    function handlePasswordOnChange(event) {
        closeMessage();
        const value = event.target.value;
        setNewPassword(value);
    }

    function handleConfirmOnChange(event) {
        closeMessage();
        const value = event.target.value;
        setConfirm(value);
    }

    function closeMessage() {
        setErrorMessage("");
        setSuccessMessage("");
    }

    function handleOnSubmit(event) {
        event.preventDefault();
        closeMessage();
        if (!checkValidPassword(newPassword)) return;
        if (!checkConfirm(confirm, newPassword)) return;
        setIsUpdating(true);
    }

    function checkValidPassword(password) {
        if (/^\S{3,}$/.test(password)) return true;
        setErrorMessage("Invalid password. Must have at least 3 characters and no white-space");
        return false;
    }

    function checkConfirm(confirm, password) {
        if (confirm === password) return true;
        setErrorMessage("Confirm must match with password.");
        return false;
    }

    function handleCloseOnClick() {
        closeMessage();
        const userInfoView = document.querySelector(".profile-content .user-info--password .user-info__view");
        const userInfoEdit = document.querySelector(".profile-content .user-info--password .user-info__edit");
        userInfoView?.classList.remove("hide-view");
        userInfoEdit?.classList.remove("show-edit");
        setTimeout(() => {
            setIsEditing(false);
        }, 400);
    }

    useEffect(callApiUpdateUserPassword, [isUpdating, dispatch, newPassword, user]);
    useEffect(processDisplayOnEditing, [isEditing]);

    function callApiUpdateUserPassword() {
        if (!isUpdating) return;
        setIsLoading(true);
        setIsUpdating(false);
        updateUserPassword();

        function updateUserPassword() {
            const onUpdateSuccess = (data) => {
                console.log("User updates password successful:");
                console.log(data);

                setIsLoading(false);
                dispatch(updateUserInfo({ password: data.password }));
                setSuccessMessage("Updated successful.");
            }

            const onUpdateFailure = (response, status, message) => {
                console.error("User updates password failed:");
                console.error(response);
                setIsLoading(false);
                setErrorMessage("Something went wrong, we cannot update password for you. Please try again.");
            }

            if (user?.role === ADMIN_ROLE) {
                adminApi.updatePassword(onUpdateSuccess, onUpdateFailure, user.id, newPassword?.trim());
            }
        }
    }

    function processDisplayOnEditing() {
        if (!isEditing) return;
        const userInfoView = document.querySelector(".profile-content .user-info--password .user-info__view");
        const userInfoEdit = document.querySelector(".profile-content .user-info--password .user-info__edit");
        userInfoView?.classList.add("hide-view");
        userInfoEdit?.classList.add("show-edit");

        const input = userInfoEdit.querySelector("input");
        input?.focus();
    }

    return (
        <div className="user-info user-info--password">
            {isLoading && <Loader />}

            <div className="user-info__view">
                <p className="user-info__label">Password</p>
                <p className="user-info__value">******</p>
                <p
                    className="user-info__edit-icon"
                    tabIndex="0"
                    onClick={handleEditOnClick}
                    onKeyDown={handleEditOnKeydown}
                >
                    <MdModeEditOutline />
                </p>
            </div>

            {isEditing &&
                <form
                    className="user-info__edit"
                    onSubmit={handleOnSubmit}
                >
                    <div className="user-info__control">
                        <p className="user-info__label">New Pass</p>
                        <input
                            className="user-info__value"
                            type="password"
                            value={newPassword}
                            onChange={handlePasswordOnChange}
                            placeholder="Enter new password"
                        />
                    </div>
                    <div className="user-info__control">
                        <p className="user-info__label">Confirm</p>
                        <input
                            className="user-info__value"
                            type="password"
                            value={confirm}
                            onChange={handleConfirmOnChange}
                            placeholder="Re-enter new password"
                        />
                    </div>

                    {errorMessage && <ErrorMessage message={errorMessage} />}
                    {successMessage && <SuccessfulMessage message={successMessage} />}
                    <div className="user-info__panel">
                        <button type="submit">Save</button>
                        <span onClick={handleCloseOnClick}>Close</span>
                    </div>
                </form>
            }
        </div>
    );
}

export default UserInfoPassword;