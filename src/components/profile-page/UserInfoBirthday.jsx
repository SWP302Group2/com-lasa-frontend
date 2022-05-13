import { memo, useEffect, useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import adminApi from "../../api/adminApi";
import lecturerApi from "../../api/lecturerApi";
import studentApi from "../../api/studentApi";
import { updateUserInfo } from "../../redux/actions/user";
import { ADMIN_ROLE, LECTURER_ROLE, STUDENT_ROLE } from "../../utils/constant";
import dateTools from "../../utils/dateTools";
import ErrorMessage from "../ErrorMessage";
import Loader from "../Loader";
import SuccessfulMessage from "../SuccessfulMessage";

function UserInfoBirthday() {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [newBirthday, setNewBirthday] = useState("");
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
        // if (!user.role) return;
        setIsEditing(true);
        if (user.birthday) {
            const oldBirthday = new Date(user.birthday);
            if (String(oldBirthday) === "Invalid Date") return;

            const oldBirthdayString = dateTools.convertDateToISOStringWithTimeZoneOffset(oldBirthday).split("T")[0];
            setNewBirthday(oldBirthdayString);
        }
    }

    function handleBirthdayOnChange(event) {
        closeMessage();
        const value = event.target.value;
        setNewBirthday(value);
        console.log(value);
        console.log(typeof value);
    }

    function closeMessage() {
        setErrorMessage("");
        setSuccessMessage("");
    }

    function handleOnSubmit(event) {
        event.preventDefault();
        closeMessage();
        if (!checkValidBirthday(newBirthday)) return;
        setIsUpdating(true);
    }

    function checkValidBirthday(birthday) {
        const birthdayObject = new Date(birthday);
        if (String(birthdayObject) === "Invalid Date") {
            setErrorMessage("Invalid date, please try again.");
            return false;
        }

        const today = new Date();
        if (birthdayObject.getTime() > today.getTime()) {
            setErrorMessage("Your birthday cannot be in future, please try again.");
            return false;
        }
        return true;
    }

    function handleCloseOnClick() {
        closeMessage();
        const userInfoView = document.querySelector(".profile-content .user-info--birthday .user-info__view");
        const userInfoEdit = document.querySelector(".profile-content .user-info--birthday .user-info__edit");
        userInfoView?.classList.remove("hide-view");
        userInfoEdit?.classList.remove("show-edit");
        setTimeout(() => {
            setIsEditing(false);
        }, 400);
    }

    useEffect(callApiUpdateUserBirthday, [isUpdating, dispatch, newBirthday, user]);
    useEffect(processDisplayOnEditing, [isEditing]);

    function callApiUpdateUserBirthday() {
        if (!isUpdating) return;
        setIsLoading(true);
        setIsUpdating(false);
        updateUserBirthday();

        function updateUserBirthday() {
            const onUpdateSuccess = (data) => {
                console.log("User updates birthday successful:");
                console.log(data);
                setIsLoading(false);
                dispatch(updateUserInfo({ birthday: data.birthday }));
                setSuccessMessage("Updated successful.");
            }

            const onUpdateFailure = (response, status, message) => {
                console.error("User updates birthday failed:");
                console.error(response);
                setIsLoading(false);
                setErrorMessage("Something went wrong, we cannot update birthday for you. Please try again.");
            }

            if (user?.role === STUDENT_ROLE) {
                studentApi.updateBirthday(onUpdateSuccess, onUpdateFailure, user.id, newBirthday);
            }
            if (user?.role === LECTURER_ROLE) {
                lecturerApi.updateBirthday(onUpdateSuccess, onUpdateFailure, user.id, newBirthday);
            }
            if (user?.role === ADMIN_ROLE) {
                adminApi.updateBirthday(onUpdateSuccess, onUpdateFailure, user.id, newBirthday);
            }
        }
    }

    function processDisplayOnEditing() {
        if (!isEditing) return;
        const userInfoView = document.querySelector(".profile-content .user-info--birthday .user-info__view");
        const userInfoEdit = document.querySelector(".profile-content .user-info--birthday .user-info__edit");
        userInfoView?.classList.add("hide-view");
        userInfoEdit?.classList.add("show-edit");

        const input = userInfoEdit.querySelector("input");
        input?.focus();
    }

    return (
        <div className="user-info user-info--birthday">
            {isLoading && <Loader />}

            <div className="user-info__view">
                <p className="user-info__label">Birthday</p>
                <p className="user-info__value">
                    {user.birthday && dateTools.convertLocalDateTimeStringToObject(user.birthday).getNormalDateString()}
                </p>
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
                        <p className="user-info__label">Birthday</p>
                        <input
                            className="user-info__value"
                            type="date"
                            value={newBirthday}
                            placeholder="mm/dd/yyyy"
                            onChange={handleBirthdayOnChange}
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

export default memo(UserInfoBirthday);