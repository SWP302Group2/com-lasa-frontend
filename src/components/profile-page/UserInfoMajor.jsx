import { useEffect, useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import majorApi from "../../api/majorApi";
import studentApi from "../../api/studentApi";
import { updateUserInfo } from "../../redux/actions/user";
import { STUDENT_ROLE } from "../../utils/constant";
import ErrorMessage from "../ErrorMessage";
import Loader from "../Loader";
import SuccessfulMessage from "../SuccessfulMessage";

function UserInfoMajor() {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [newMajor, setNewMajor] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [majors, setMajors] = useState([]);

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
        setNewMajor(user.majorId);
    }

    function handleMajorOnChange(event) {
        closeMessage();
        const value = event.target.value;
        setNewMajor(value);
        checkValidMajor(value);
    }

    function checkValidMajor(value) {
        const result = Array.isArray(majors) && majors.length > 0
            && majors.find(major => major.id === value);
        if (!result) {
            setErrorMessage("Invalid major, please try again.");
            return false;
        }

        return false;

    }

    function closeMessage() {
        setErrorMessage("");
        setSuccessMessage("");
    }

    function handleOnSubmit(event) {
        event.preventDefault();
        closeMessage();
        if (!checkValidMajor) return;
        setIsUpdating(true);
    }

    function handleCloseOnClick() {
        closeMessage();
        const userInfoView = document.querySelector(".profile-content .user-info--major .user-info__view");
        const userInfoEdit = document.querySelector(".profile-content .user-info--major .user-info__edit");
        userInfoView?.classList.remove("hide-view");
        userInfoEdit?.classList.remove("show-edit");
        setTimeout(() => {
            setIsEditing(false);
        }, 400);
    }

    useEffect(callApiGetMajors, [majors]);
    useEffect(callApiUpdateUserMajor, [isUpdating, dispatch, newMajor, user]);
    useEffect(processDisplayOnEditing, [isEditing]);

    function callApiGetMajors() {
        if (!Array.isArray(majors) || majors.length > 0) return;
        getMajors();

        function getMajors() {
            const onGetSuccess = (data) => {
                console.log("Profile get majors successful:");
                console.log(data);
                setMajors(data);
            }

            const onGetFailure = (response, status, message) => {
                console.error("Profile get major failed:");
                console.error(response);
                setMajors([]);
            }

            majorApi.getMajorsWithoutPaging(onGetSuccess, onGetFailure);
        }
    }

    function callApiUpdateUserMajor() {
        if (!isUpdating) return;
        setIsLoading(true);
        setIsUpdating(false);
        updateUserMajor();

        function updateUserMajor() {
            const onUpdateSuccess = (data) => {
                console.log("User updates major successful:");
                console.log(data);
                setIsLoading(false);
                dispatch(updateUserInfo({ majorId: data.majorId }));
                setSuccessMessage("Updated successful.");
            }

            const onUpdateFailure = (response, status, message) => {
                console.error("User updates major failed:");
                console.error(response);
                setIsLoading(false);
                setErrorMessage("Something went wrong, we cannot update major for you. Please try again.");
            }

            if (user?.role === STUDENT_ROLE) {
                studentApi.updateMajor(onUpdateSuccess, onUpdateFailure, user.id, newMajor?.trim());
            }
        }
    }

    function processDisplayOnEditing() {
        if (!isEditing) return;
        const userInfoView = document.querySelector(".profile-content .user-info--major .user-info__view");
        const userInfoEdit = document.querySelector(".profile-content .user-info--major .user-info__edit");
        userInfoView?.classList.add("hide-view");
        userInfoEdit?.classList.add("show-edit");

        const input = userInfoEdit.querySelector("input");
        input?.focus();
    }

    return (
        <div className="user-info user-info--major">
            {isLoading && <Loader />}

            <div className="user-info__view">
                <p className="user-info__label">Major</p>
                <p className="user-info__value">{user.majorId}</p>
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
                        <p className="user-info__label">Major</p>
                        <select
                            className="user-info__value"
                            value={newMajor}
                            onChange={handleMajorOnChange}
                        >
                            {majors && majors.length > 0 && majors.map(major =>
                                <option
                                    key={`major__${major.id}`}
                                    value={major?.id}
                                >
                                    {major.id}
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

export default UserInfoMajor;