import { useEffect, useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import lecturerApi from "../../api/lecturerApi";
import { updateUserInfo } from "../../redux/actions/user";
import { LECTURER_ROLE } from "../../utils/constant";
import ErrorMessage from "../ErrorMessage";
import Loader from "../Loader";
import SuccessfulMessage from "../SuccessfulMessage";

function UserInfoMeetingUrl() {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [newMeetingUrl, setNewMeetingUrl] = useState("");
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
        setNewMeetingUrl(user.meetingUrl);
    }

    function handleMeetingUrlOnChange(event) {
        closeMessage();
        const value = event.target.value;
        setNewMeetingUrl(value);
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
        const userInfoView = document.querySelector(".profile-content .user-info--meetingUrl .user-info__view");
        const userInfoEdit = document.querySelector(".profile-content .user-info--meetingUrl .user-info__edit");
        userInfoView?.classList.remove("hide-view");
        userInfoEdit?.classList.remove("show-edit");
        setTimeout(() => {
            setIsEditing(false);
        }, 400);
    }

    useEffect(callApiUpdateUserMeetingUrl, [isUpdating, dispatch, newMeetingUrl, user]);
    useEffect(processDisplayOnEditing, [isEditing]);

    function callApiUpdateUserMeetingUrl() {
        if (!isUpdating) return;
        setIsLoading(true);
        setIsUpdating(false);
        updateUserMeetingUrl();

        function updateUserMeetingUrl() {
            const onUpdateSuccess = (data) => {
                console.log("User updates meetingUrl successful:");
                console.log(data);
                setIsLoading(false);
                dispatch(updateUserInfo({ meetingUrl: data.meetingUrl }));
                setSuccessMessage("Updated successful.");
            }

            const onUpdateFailure = (response, status, message) => {
                console.error("User updates meetingUrl failed:");
                console.error(response);
                setIsLoading(false);
                setErrorMessage("Something went wrong, we cannot update meetingUrl for you. Please try again.");
            }

            if (user?.role === LECTURER_ROLE) {
                lecturerApi.updateMeetingUrl(onUpdateSuccess, onUpdateFailure, user.id, newMeetingUrl?.trim());
            }
        }
    }

    function processDisplayOnEditing() {
        if (!isEditing) return;
        const userInfoView = document.querySelector(".profile-content .user-info--meetingUrl .user-info__view");
        const userInfoEdit = document.querySelector(".profile-content .user-info--meetingUrl .user-info__edit");
        userInfoView?.classList.add("hide-view");
        userInfoEdit?.classList.add("show-edit");

        const input = userInfoEdit.querySelector("input");
        input?.focus();
    }

    return (
        <div className="user-info user-info--meetingUrl">
            {isLoading && <Loader />}

            <div className="user-info__view">
                <p className="user-info__label">MeetingUrl</p>
                <a className="user-info__value" href={user.meetingUrl || ""}>
                    {user.meetingUrl}
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
                        <p className="user-info__label">MeetingUrl</p>
                        <input
                            className="user-info__value"
                            value={newMeetingUrl}
                            onChange={handleMeetingUrlOnChange}
                            placeholder="Enter your MeetingUrl"
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

export default UserInfoMeetingUrl;