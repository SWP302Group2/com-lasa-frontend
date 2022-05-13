import { useEffect, useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import adminApi from "../../api/adminApi";
import lecturerApi from "../../api/lecturerApi";
import studentApi from "../../api/studentApi";
import { genderList } from "../../data/genderList";
import { updateUserInfo } from "../../redux/actions/user";
import { ADMIN_ROLE, LECTURER_ROLE, STUDENT_ROLE } from "../../utils/constant";
import { genderTool } from "../../utils/genderTools";
import ErrorMessage from "../ErrorMessage";
import Loader from "../Loader";
import SuccessfulMessage from "../SuccessfulMessage";

function UserInfoGender() {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [newGender, setNewGender] = useState("");
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
        setNewGender(user.gender);
    }

    function handleGenderOnChange(event) {
        closeMessage();
        const value = event.target.value;
        setNewGender(value);
        checkValidGender(value);
    }

    function checkValidGender(value) {
        if (!(/^-?\d+$/.test(value))) {
            setErrorMessage("Not valid gender, please try again");
            return false;
        }

        const result = genderList.find(item => item.value === Number.parseInt(value));
        if (!result) {
            setErrorMessage("Not exist gender, please try again");
            return false;
        }
        return true;
    }

    function closeMessage() {
        setErrorMessage("");
        setSuccessMessage("");
    }

    function handleOnSubmit(event) {
        event.preventDefault();
        closeMessage();
        if (!checkValidGender(newGender)) return;
        setIsUpdating(true);
    }

    function handleCloseOnClick() {
        closeMessage();
        const userInfoView = document.querySelector(".profile-content .user-info--gender .user-info__view");
        const userInfoEdit = document.querySelector(".profile-content .user-info--gender .user-info__edit");
        userInfoView?.classList.remove("hide-view");
        userInfoEdit?.classList.remove("show-edit");
        setTimeout(() => {
            setIsEditing(false);
        }, 400);
    }

    useEffect(callApiUpdateUserGender, [isUpdating, dispatch, newGender, user]);
    useEffect(processDisplayOnEditing, [isEditing]);

    function callApiUpdateUserGender() {
        if (!isUpdating) return;
        setIsLoading(true);
        setIsUpdating(false);
        updateUserGender();

        function updateUserGender() {
            const onUpdateSuccess = (data) => {
                console.log("User updates gender successful:");
                console.log(data);
                setIsLoading(false);
                dispatch(updateUserInfo({ gender: data.gender }));
                setSuccessMessage("Updated successful.");
            }

            const onUpdateFailure = (response, status, message) => {
                console.error("User updates gender failed:");
                console.error(response);
                setIsLoading(false);
                setErrorMessage("Something went wrong, we cannot update gender for you. Please try again.");
            }

            if (user?.role === STUDENT_ROLE) {
                studentApi.updateGender(onUpdateSuccess, onUpdateFailure, user.id, newGender?.trim());
            }
            if (user?.role === LECTURER_ROLE) {
                lecturerApi.updateGender(onUpdateSuccess, onUpdateFailure, user.id, newGender?.trim());
            }
            if (user?.role === ADMIN_ROLE) {
                adminApi.updateGender(onUpdateSuccess, onUpdateFailure, user.id, newGender?.trim());
            }
        }
    }

    function processDisplayOnEditing() {
        if (!isEditing) return;
        const userInfoView = document.querySelector(".profile-content .user-info--gender .user-info__view");
        const userInfoEdit = document.querySelector(".profile-content .user-info--gender .user-info__edit");
        userInfoView?.classList.add("hide-view");
        userInfoEdit?.classList.add("show-edit");

        const input = userInfoEdit.querySelector("input");
        input?.focus();
    }

    return (
        <div className="user-info user-info--gender">
            {isLoading && <Loader />}

            <div className="user-info__view">
                <p className="user-info__label">Gender</p>
                <p className="user-info__value">
                    {genderTool.getGenderName(user.gender) || ""}
                </p>
                <p
                    className="user-info__edit-icon"
                    tabIndex="0"
                    title="Edit"
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
                        <p className="user-info__label">Gender</p>
                        <select
                            className="user-info__value"
                            value={newGender || ""}
                            onChange={handleGenderOnChange}
                        >
                            <option disabled value={""}> -- Select your gender -- </option>
                            {genderList?.map(item =>
                                <option
                                    key={`value_${item.value}`}
                                    value={item.value}
                                >
                                    {item.name}
                                </option>
                            )}
                        </select>
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

export default UserInfoGender;