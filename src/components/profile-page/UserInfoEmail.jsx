import { useEffect, useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import adminApi from "../../api/adminApi";
import { updateUserInfo } from "../../redux/actions/user";
import { ADMIN_ROLE } from "../../utils/constant";
import ErrorMessage from "../ErrorMessage";
import Loader from "../Loader";
import SuccessfulMessage from "../SuccessfulMessage";

function UserInfoEmail() {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [newEmail, setNewEmail] = useState("");
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
        if (!user.role || user.role !== ADMIN_ROLE) return;
        setIsEditing(true);
        setNewEmail(user.email);
    }

    function handleEmailOnChange(event) {
        closeMessage();
        const value = event.target.value;
        setNewEmail(value);
    }

    function checkValidEmailNotPerfect(email) {
        if (email == null || typeof email !== "string") return false;
        const regex = new RegExp(/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/);
        if (regex.test(String(email).trim().toLowerCase())) return true;

        setErrorMessage("Your email is not in valid form. If you sure your email is valid, please contact us.");
        return false;
    }

    function closeMessage() {
        setErrorMessage("");
        setSuccessMessage("");
    }

    function handleOnSubmit(event) {
        event.preventDefault();
        closeMessage();
        if (!checkValidEmailNotPerfect(newEmail)) return;
        setIsUpdating(true);
    }

    function handleCloseOnClick() {
        closeMessage();
        const userInfoView = document.querySelector(".profile-content .user-info--email .user-info__view");
        const userInfoEdit = document.querySelector(".profile-content .user-info--email .user-info__edit");
        userInfoView?.classList.remove("hide-view");
        userInfoEdit?.classList.remove("show-edit");
        setTimeout(() => {
            setIsEditing(false);
        }, 400);
    }

    useEffect(callApiUpdateUserEmail, [isUpdating, dispatch, newEmail, user]);
    useEffect(processDisplayOnEditing, [isEditing]);

    function callApiUpdateUserEmail() {
        if (!isUpdating) return;
        setIsLoading(true);
        setIsUpdating(false);
        updateUserEmail();

        function updateUserEmail() {
            const onUpdateSuccess = (data) => {
                console.log("User updates email successful:");
                console.log(data);

                setIsLoading(false);
                dispatch(updateUserInfo({ email: data.email }));
                setSuccessMessage("Updated successful.");
            }

            const onUpdateFailure = (response, status, message) => {
                console.error("User updates email failed:");
                console.error(response);
                setIsLoading(false);
                setErrorMessage("Something went wrong, we cannot update email for you. Please try again.");
            }

            if (user.role === ADMIN_ROLE) {
                adminApi.updateEmail(onUpdateSuccess, onUpdateFailure, user.id, newEmail?.trim());
            }
        }
    }

    function processDisplayOnEditing() {
        if (!isEditing) return;
        const userInfoView = document.querySelector(".profile-content .user-info--email .user-info__view");
        const userInfoEdit = document.querySelector(".profile-content .user-info--email .user-info__edit");
        userInfoView?.classList.add("hide-view");
        userInfoEdit?.classList.add("show-edit");

        const input = userInfoEdit.querySelector("input");
        input?.focus();
    }

    return (
        <div className="user-info user-info--email">
            {isLoading && <Loader />}

            <div className="user-info__view">
                <p className="user-info__label">Email</p>
                <p className="user-info__value">{user.email}</p>
                {user.role === ADMIN_ROLE &&
                    <p
                        className="user-info__edit-icon"
                        tabIndex="0"
                        onClick={handleEditOnClick}
                        onKeyDown={handleEditOnKeydown}
                    >
                        <MdModeEditOutline />
                    </p>
                }
            </div>

            {isEditing && user.role === ADMIN_ROLE &&
                <form
                    className="user-info__edit"
                    onSubmit={handleOnSubmit}
                >
                    <div className="user-info__control">
                        <p className="user-info__label">Email</p>
                        <input
                            className="user-info__value"
                            value={newEmail}
                            onChange={handleEmailOnChange}
                            placeholder="Your Email"
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

export default UserInfoEmail;