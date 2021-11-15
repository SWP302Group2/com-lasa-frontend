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
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import phoneTools from "../../utils/phoneTools";

function UserInfoPhone() {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [newPhone, setNewPhone] = useState("");
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
        setNewPhone(user.phone);
    }

    function handlePhoneOnChange(value) {
        closeMessage();
        setNewPhone(value);
        console.log(value);
    }

    function closeMessage() {
        setErrorMessage("");
        setSuccessMessage("");
    }

    function handleOnSubmit(event) {
        event.preventDefault();
        closeMessage();
        if (!checkValidPhone(newPhone)) return;
        setIsUpdating(true);
    }

    function checkValidPhone(phoneNumber) {
        if (/\d{8,15}/.test(phoneNumber)) return true;
        setErrorMessage("Invalid number. Please try again");
        return false;
    }

    function handleCloseOnClick() {
        closeMessage();
        const userInfoView = document.querySelector(".profile-content .user-info--phone .user-info__view");
        const userInfoEdit = document.querySelector(".profile-content .user-info--phone .user-info__edit");
        userInfoView?.classList.remove("hide-view");
        userInfoEdit?.classList.remove("show-edit");
        setTimeout(() => {
            setIsEditing(false);
        }, 400);
    }

    useEffect(callApiUpdateUserPhone, [isUpdating, dispatch, newPhone, user]);
    useEffect(processDisplayOnEditing, [isEditing]);

    function callApiUpdateUserPhone() {
        if (!isUpdating) return;
        setIsLoading(true);
        setIsUpdating(false);
        updateUserPhone();

        function updateUserPhone() {
            const onUpdateSuccess = (data) => {
                console.log("User updates phone successful:");
                console.log(data);
                setIsLoading(false);
                dispatch(updateUserInfo({ phone: data.phone }));
                setSuccessMessage("Updated successful.");
            }

            const onUpdateFailure = (response, status, message) => {
                console.error("User updates phone failed:");
                console.error(response);
                setIsLoading(false);
                setErrorMessage("Something went wrong, we cannot update phone for you. Please try again.");
            }

            if (user?.role === STUDENT_ROLE) {
                studentApi.updatePhone(onUpdateSuccess, onUpdateFailure, user.id, newPhone?.trim());
            }
            if (user?.role === LECTURER_ROLE) {
                lecturerApi.updatePhone(onUpdateSuccess, onUpdateFailure, user.id, newPhone?.trim());
            }
            if (user?.role === ADMIN_ROLE) {
                adminApi.updatePhone(onUpdateSuccess, onUpdateFailure, user.id, newPhone?.trim());
            }
        }
    }

    function processDisplayOnEditing() {
        if (!isEditing) return;
        const userInfoView = document.querySelector(".profile-content .user-info--phone .user-info__view");
        const userInfoEdit = document.querySelector(".profile-content .user-info--phone .user-info__edit");
        userInfoView?.classList.add("hide-view");
        userInfoEdit?.classList.add("show-edit");

        const input = userInfoEdit.querySelector("input");
        input?.focus();
    }
    return (
        <div className="user-info user-info--phone">
            {isLoading && <Loader />}

            <div className="user-info__view">
                <p className="user-info__label">Phone</p>
                <p className="user-info__value">
                    {phoneTools.displayPhone(user.phone)}
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
                        <p className="user-info__label">Phone</p>
                        <PhoneInput
                            className="user-info__value"
                            value={newPhone}
                            onChange={handlePhoneOnChange}
                            country={"vn"}
                            placeholder="Enter your phone"
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

export default UserInfoPhone;