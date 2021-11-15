import { useEffect, useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import adminApi from "../../api/adminApi";
import lecturerApi from "../../api/lecturerApi";
import studentApi from "../../api/studentApi";
import { updateUserInfo } from "../../redux/actions/user";
import { ADMIN_ROLE, LECTURER_ROLE, STUDENT_ROLE } from "../../utils/constant";
import ErrorMessage from "../ErrorMessage";
import Loader from "../Loader";
import SuccessfulMessage from "../SuccessfulMessage";

function UserInfoName() {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState("");
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
        setNewName(user.name);
    }

    function handleNameOnChange(event) {
        closeMessage();
        const value = event.target.value;
        setNewName(value);
    }

    function checkValidName(name) {
        if (name == null) return false;

        if (/\S/.test(name)) return true;

        setErrorMessage("Cannot be empty or invisible.");
        return false;
    }

    function closeMessage() {
        setErrorMessage("");
        setSuccessMessage("");
    }

    function handleOnSubmit(event) {
        event.preventDefault();
        closeMessage();
        if (!checkValidName(newName)) return;
        setIsUpdating(true);
    }

    function handleCloseOnClick() {
        closeMessage();
        const userInfoView = document.querySelector(".profile-content .user-info--name .user-info__view");
        const userInfoEdit = document.querySelector(".profile-content .user-info--name .user-info__edit");
        userInfoView?.classList.remove("hide-view");
        userInfoEdit?.classList.remove("show-edit");
        setTimeout(() => {
            setIsEditing(false);
        }, 400);
    }

    useEffect(callApiUpdateUserName, [isUpdating, dispatch, newName, user]);
    useEffect(processDisplayOnEditing, [isEditing]);

    function callApiUpdateUserName() {
        if (!isUpdating) return;
        setIsLoading(true);
        setIsUpdating(false);
        updateUserName();

        function updateUserName() {
            const onUpdateSuccess = (data) => {
                console.log("User updates name successful:");
                console.log(data);
                setIsLoading(false);
                dispatch(updateUserInfo({ name: data.name }));
                setSuccessMessage("Updated successful.");
            }

            const onUpdateFailure = (response, status, message) => {
                console.error("User updates name failed:");
                console.error(response);
                setIsLoading(false);
                setErrorMessage("Something went wrong, we cannot update name for you. Please try again.");
            }

            if (user?.role === STUDENT_ROLE) {
                studentApi.updateName(onUpdateSuccess, onUpdateFailure, user.id, newName?.trim());
            }
            if (user?.role === LECTURER_ROLE) {
                lecturerApi.updateName(onUpdateSuccess, onUpdateFailure, user.id, newName?.trim());
            }
            if (user?.role === ADMIN_ROLE) {
                adminApi.updateName(onUpdateSuccess, onUpdateFailure, user.id, newName?.trim());
            }
        }
    }

    function processDisplayOnEditing() {
        if (!isEditing) return;
        const userInfoView = document.querySelector(".profile-content .user-info--name .user-info__view");
        const userInfoEdit = document.querySelector(".profile-content .user-info--name .user-info__edit");
        userInfoView?.classList.add("hide-view");
        userInfoEdit?.classList.add("show-edit");

        const input = userInfoEdit.querySelector("input");
        input?.focus();
    }

    return (
        <div className="user-info user-info--name">
            {isLoading && <Loader />}

            <div className="user-info__view">
                <p className="user-info__label">Name</p>
                <p className="user-info__value">{user.name || "Anonymous"}</p>
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
                        <p className="user-info__label">Name</p>
                        <input
                            className="user-info__value"
                            value={newName}
                            onChange={handleNameOnChange}
                            placeholder="Enter your name"
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

export default UserInfoName;