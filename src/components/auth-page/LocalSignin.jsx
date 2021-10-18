import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import authApi from "../../api/authApi";
import { createNetworkError } from "../../redux/actions/error";
import { newUserInfo } from "../../redux/actions/user";
import storageTools from "../../utils/storageTools";
import ErrorMessage from "../ErrorMessage";


function LocalSignin({ setIsLoading }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [localSignInErrorMessage, setLocalSignInErrorMessage] = useState("");
    const [{ username, password }, setLocalSigninValue] = useState({ username: "", password: "" });

    function handleUsernameChange(event) {
        const value = event?.target?.value || "";
        setLocalSigninValue({
            username: value,
            password: password
        })
    }

    function handlePasswordChange(event) {
        const value = event?.target?.value || "";
        setLocalSigninValue({
            username: username,
            password: value
        })
    }

    function handleLocalFormSubmit(event) {
        setIsLoading(true);
        event.preventDefault();
        authApi.signInLocal(
            username,
            password,
            handleSignInLocalSuccess,
            handleSignInLocalFail
        );
    }

    function handleSignInLocalSuccess(data) {
        storageTools.saveToken(data.accessToken);
        authApi.getCurrentUserInfo(onGetSuccess, onGetFailure);
    }

    function onGetSuccess(data) {
        dispatch(newUserInfo({
            role: data.role,
            ...data.information
        }))
        setIsLoading(false);
        history.push("/home");
    }

    function onGetFailure(response, status, message) {
        console.log("Auto signin has failed:")
        console.log(response)

        storageTools.removeAccessToken();
        dispatch(newUserInfo());
        setIsLoading(false);

        if (status >= 500 && message === "Network Error") {
            history.push(createNetworkError());
        }
    }

    function handleSignInLocalFail(response, status, message) {
        console.log("Local sign-in has failed: ");
        console.log(response);

        setLocalSigninValue({
            username: username,
            password: ""
        })

        if (message === "Network Error") {
            history.push(createNetworkError());
            return;
        }

        setLocalSignInErrorMessage("Username or password is invalid");
        setIsLoading(false);
    }


    return (
        <form
            id="form-sign-in-local"
            className="local"
            onSubmit={handleLocalFormSubmit}
        >
            <div className="local__control">
                <input
                    className="local__input"
                    type="text"
                    placeholder=" "
                    value={username}
                    onChange={handleUsernameChange}
                />
                <label className="local__label" htmlFor="username">
                    Username
                </label>
            </div>
            <div className="local__control">
                <input
                    className="local__input"
                    type="password"
                    placeholder=" "
                    value={password}
                    onChange={handlePasswordChange}
                />
                <label className="local__label" htmlFor="password">
                    Password
                </label>
            </div>
            {
                localSignInErrorMessage ?
                    <ErrorMessage message={localSignInErrorMessage} />
                    :
                    null
            }
            <button
                className="local__button"
                type="submit"
            >
                Submit
            </button>
        </form>
    );
}

export default LocalSignin;