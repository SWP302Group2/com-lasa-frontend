import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import authApi from "../../api/authApi";
import {
    updateNameToSignupInfo,
    updateProcessPosition,
    updateVerificationStatus
} from "../../redux/actions/signup";
import storageTools from "../../utils/storageTools";
import ErrorMessage from "../ErrorMessage";
import LoadingEffect from "../LoadingEffect";

function InputAndConfirm({ setPosition }) {
    const userInfo = useSelector(state => state.signup.userInfo);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
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

    function handleFormOnSubmit(event) {
        event.preventDefault();
        if (userInfo.name == null || userInfo.name === "") {
            setNameError("Your name cannot be empty!");
            return;
        }
        console.log(userInfo);

        const sendingData = prepareSendingSignupData();

        if (sendingData.role && sendingData.role === "STUDENT") {
            setIsLoading(true);
            authApi.signUpStudent(sendingData, handleSignupSuccess, handleSignupFailse);
            return;
        }
        if (sendingData.role && sendingData.role === "LECTURER") {
            setIsLoading(true);
            authApi.signUpLecturer(sendingData, handleSignupSuccess, handleSignupFailse);
        }
    }

    function prepareSendingSignupData() {

        let sendingData = { ...userInfo };
        if (Array.isArray(userInfo.topics)) {
            const listIdTopic = Array.isArray(userInfo.topics) && [...userInfo.topics].map(topic => topic.id);
            sendingData.topics = listIdTopic;
        }
        console.log("Sending data:")
        console.log(sendingData);
        return { ...sendingData };
    }

    function handleSignupSuccess(data) {
        console.log(data);
        setIsLoading(false);
        storageTools.saveToken(data.accessToken);
        dispatch(updateVerificationStatus(true));
        dispatch(updateProcessPosition(4));
        setPosition(4);
    }

    function handleSignupFailse(response, status, message) {
        console.log(response);
        setIsLoading(false);
        dispatch(updateVerificationStatus(false));
        dispatch(updateProcessPosition(4));
        setPosition(4);
    }

    return (
        <div className="sign-up__step  confirm">
            <div className="sign-up__step__title">
                Confirm your profile.
            </div>
            <form
                id="sign-up-form"
                className="confirm__form"
                onSubmit={handleFormOnSubmit}
            >
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
                <p className="confirm__note">
                    By clicking submit you are agreeing to the <a href="/about/terms">Terms and Conditions</a>
                </p>
                <button className="confirm__button" type="submit">Submit</button>

            </form>
            {isLoading ? <LoadingEffect /> : null}
        </div>
    );
}

export default InputAndConfirm;