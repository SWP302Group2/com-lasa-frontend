import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import authApi from "../../api/authApi";
import { updateMeetUrlToSignupInfo, updateMSSVToSignupInfo, updateNameToSignupInfo, updateProcessPosition, updateVerificationStatus } from "../../redux/actions/signup";
import cookieTools from "../../utils/cookieTools";
import ErrorMessage from "../ErrorMessage";

function InputAndConfirm({ setPosition }) {
    const userInfo = useSelector(state => state.signup.userInfo);
    const dispatch = useDispatch();
    const [nameError, setNameError] = useState("");

    function handleNameChange(event) {
        const newValue = event?.target?.value;
        setNameError("");
        if (newValue != null) {
            if (newValue === "") {
                setNameError("Your name cannot be empty!");
            }
            dispatch(updateNameToSignupInfo(newValue));
        }

        document.getElementById("confirm-name").value = userInfo.name;
    }

    function handleMSSVChange(event) {
        const newValue = event?.target?.value || "";
        dispatch(updateMSSVToSignupInfo(newValue));
        document.getElementById("confirm-mssv").value = userInfo.mssv;
    }

    function handleMeetUrlChange(event) {
        const newValue = event?.target?.value || "";
        dispatch(updateMeetUrlToSignupInfo(newValue));
        document.getElementById("confirm-meetUrl").value = userInfo.meetUrl;
    }

    useEffect(() => {
        console.log(userInfo);
        const form = document.getElementById("sign-up-form");

        //STart
        (() => {
            form.addEventListener("submit", handleFormSubmitEvent);
        })();

        function handleFormSubmitEvent(event) {
            event.preventDefault();
            if (userInfo.name == null || userInfo.name === "") {
                setNameError("Your name cannot be empty!");
                return;
            }

            if (userInfo.role && userInfo.role === "STUDENT") {
                authApi.signUpStudent(userInfo, handleSignupSuccess, handleSignupFailse);
                return;
            }
            if (userInfo.role && userInfo.role === "LECTURER") {
                authApi.signUpLecturer(userInfo, handleSignupSuccess, handleSignupFailse);
            }
        }

        function handleSignupSuccess(cookieData) {
            cookieTools.saveToken(cookieData);
            console.log(cookieData);
            dispatch(updateVerificationStatus(true));
            dispatch(updateProcessPosition(4));
            setPosition(4);
        }

        function handleSignupFailse(response) {
            console.log(response);
            dispatch(updateVerificationStatus(false));
            dispatch(updateProcessPosition(4));
            setPosition(4);
        }

        return () => {
            form?.removeEventListener("submit", handleFormSubmitEvent);
        }

    }, [userInfo, setPosition, dispatch]);

    return (
        <div className="sign-up__step  confirm">
            <div className="sign-up__step__title">
                Confirm your infomation.
            </div>
            <form className="confirm__form" id="sign-up-form">
                <div className="confirm__avatar">
                    <img
                        src={userInfo.avatarUrl}
                        alt="your avatar" width="100" height="100"
                        className="confirm__avatar" />
                </div>
                <label className="confirm__control">
                    Your name
                    <input
                        id="confirm-name"
                        type="text"
                        className="confirm__input"
                        name="name"
                        defaultValue={userInfo.name}
                        onChange={handleNameChange} />
                </label>
                {nameError ? <ErrorMessage message={nameError} /> : null}
                <label className="confirm__control">
                    Email
                    <input
                        type="text"
                        className="confirm__input"
                        name="name"
                        value={userInfo.email}
                        readOnly
                        disabled />
                </label>
                <label className="confirm__control">
                    You are
                    <input
                        type="text"
                        className="confirm__input"
                        name="name"
                        value={userInfo.role}
                        readOnly
                        disabled />
                </label>
                {userInfo.role === "STUDENT" ?
                    <label className="confirm__control">
                        MSSV (Optional)
                        <input
                            id="confirm-mssv"
                            type="text"
                            className="confirm__input"
                            name="name"
                            defaultValue={userInfo.mssv || ""}
                            onChange={handleMSSVChange} />
                    </label>
                    :
                    <label className="confirm__control">
                        Meeting URL (Optional)
                        <input
                            id="confirm-meetUrl"
                            type="text"
                            className="confirm__input"
                            name="name"
                            defaultValue={userInfo.meetUrl || ""}
                            onChange={handleMeetUrlChange} />
                    </label>
                }
                <p className="confirm__note">
                    By clicking submit you are agreeing to the <a href="/about/terms">Terms and Conditions</a>
                </p>
                <button className="confirm__button" type="submit">Submit</button>

            </form>
            <form id="sign-up-lecturer-form">

            </form>
        </div>
    );
}

export default InputAndConfirm;