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

function UserInfoAvatarUrl() {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [newAvatarUrl, setNewAvatarUrl] = useState("");
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
        setNewAvatarUrl(user.avatarUrl);
    }

    function handleAvatarUrlOnChange(event) {
        closeMessage();
        const value = event.target.value;
        setNewAvatarUrl(value);
    }

    function closeMessage() {
        setErrorMessage("");
        setSuccessMessage("");
    }

    function handleOnSubmit(event) {
        event.preventDefault();
        closeMessage();
        setIsUpdating(true);
    }

    function handleCloseOnClick() {
        closeMessage();
        const userInfoView = document.querySelector(".profile-content .user-info--avatarUrl .user-info__view");
        const userInfoEdit = document.querySelector(".profile-content .user-info--avatarUrl .user-info__edit");
        userInfoView?.classList.remove("hide-view");
        userInfoEdit?.classList.remove("show-edit");
        setTimeout(() => {
            setIsEditing(false);
        }, 400);
    }

    useEffect(callApiUpdateUserAvatarUrl, [isUpdating, dispatch, newAvatarUrl, user]);
    useEffect(processDisplayOnEditing, [isEditing]);

    function callApiUpdateUserAvatarUrl() {
        if (!isUpdating) return;
        setIsLoading(true);
        setIsUpdating(false);
        updateUserAvatarUrl();

        function updateUserAvatarUrl() {
            const onUpdateSuccess = (data) => {
                console.log("User updates AvatarUrl successful:");
                console.log(data);
                setIsLoading(false);

                dispatch(updateUserInfo({ avatarUrl: data.avatarUrl }));
                setSuccessMessage("Updated successful.");
            }

            const onUpdateFailure = (response, status, message) => {
                console.error("User updates avatarUrl failed:");
                console.error(response);
                setIsLoading(false);
                setErrorMessage("Something went wrong, we cannot update avatar url for you. Please try again.");
            }

            if (user?.role === STUDENT_ROLE) {
                studentApi.updateAvatarUrl(onUpdateSuccess, onUpdateFailure, user.id, newAvatarUrl?.trim());
            }
            if (user?.role === LECTURER_ROLE) {
                lecturerApi.updateAvatarUrl(onUpdateSuccess, onUpdateFailure, user.id, newAvatarUrl?.trim());
            }
            if (user?.role === ADMIN_ROLE) {
                adminApi.updateAvatarUrl(onUpdateSuccess, onUpdateFailure, user.id, newAvatarUrl?.trim());
            }
        }
    }

    function processDisplayOnEditing() {
        if (!isEditing) return;
        const userInfoView = document.querySelector(".profile-content .user-info--avatarUrl .user-info__view");
        const userInfoEdit = document.querySelector(".profile-content .user-info--avatarUrl .user-info__edit");
        userInfoView?.classList.add("hide-view");
        userInfoEdit?.classList.add("show-edit");

        const input = userInfoEdit.querySelector("input");
        input?.focus();
    }

    return (
        <div className="user-info user-info--avatarUrl">
            {isLoading && <Loader />}

            <div className="user-info__view">
                <p className="user-info__label">Avatar Url</p>
                <a className="user-info__value" href={user.avatarUrl || ""}>
                    {user.avatarUrl}
                </a>
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
                        <p className="user-info__label">Avatar</p>
                        <input
                            className="user-info__value"
                            value={newAvatarUrl || ""}
                            onChange={handleAvatarUrlOnChange}
                            placeholder="Enter your avatar url"
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

export default UserInfoAvatarUrl;