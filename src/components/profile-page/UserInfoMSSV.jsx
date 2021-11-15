import { useEffect, useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import studentApi from "../../api/studentApi";
import { updateUserInfo } from "../../redux/actions/user";
import { STUDENT_ROLE } from "../../utils/constant";
import ErrorMessage from "../ErrorMessage";
import Loader from "../Loader";
import SuccessfulMessage from "../SuccessfulMessage";

function UserInfoMSSV() {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [newMSSV, setNewMSSV] = useState("");
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
        setNewMSSV(user.mssv);
    }

    function handleMSSVOnChange(event) {
        closeMessage();
        const value = event.target.value;
        setNewMSSV(value);
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
        const userInfoView = document.querySelector(".profile-content .user-info--mssv .user-info__view");
        const userInfoEdit = document.querySelector(".profile-content .user-info--mssv .user-info__edit");
        userInfoView?.classList.remove("hide-view");
        userInfoEdit?.classList.remove("show-edit");
        setTimeout(() => {
            setIsEditing(false);
        }, 400);
    }

    useEffect(callApiUpdateUserMSSV, [isUpdating, dispatch, newMSSV, user]);
    useEffect(processDisplayOnEditing, [isEditing]);

    function callApiUpdateUserMSSV() {
        if (!isUpdating) return;
        setIsLoading(true);
        setIsUpdating(false);
        updateUserMSSV();

        function updateUserMSSV() {
            const onUpdateSuccess = (data) => {
                console.log("User updates MSSV successful:");
                console.log(data);
                setIsLoading(false);
                dispatch(updateUserInfo({ mssv: data.mssv }));
                setSuccessMessage("Updated successful.");
            }

            const onUpdateFailure = (response, status, message) => {
                console.error("User updates MSSV failed:");
                console.error(response);
                setIsLoading(false);
                setErrorMessage("Something went wrong, we cannot update MSSV for you. Please try again.");
            }

            if (user?.role === STUDENT_ROLE) {
                studentApi.updateMSSV(onUpdateSuccess, onUpdateFailure, user.id, newMSSV?.trim());
            }
        }
    }

    function processDisplayOnEditing() {
        if (!isEditing) return;
        const userInfoView = document.querySelector(".profile-content .user-info--mssv .user-info__view");
        const userInfoEdit = document.querySelector(".profile-content .user-info--mssv .user-info__edit");
        userInfoView?.classList.add("hide-view");
        userInfoEdit?.classList.add("show-edit");

        const input = userInfoEdit.querySelector("input");
        input?.focus();
    }

    return (
        <div className="user-info user-info--mssv">
            {isLoading && <Loader />}

            <div className="user-info__view">
                <p className="user-info__label">MSSV</p>
                <p className="user-info__value">{user.mssv}</p>
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
                        <p className="user-info__label">MSSV</p>
                        <input
                            className="user-info__value"
                            value={newMSSV}
                            onChange={handleMSSVOnChange}
                            placeholder="Enter your MSSV"
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

export default UserInfoMSSV;