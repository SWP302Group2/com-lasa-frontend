import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import authApi from "../../api/authApi";
import "../../assets/css/signInContent.css";
import { createNetworkError, createUnknownError } from "../../redux/actions/error";
import {
    ACCOUNT_NOT_FOUND,
    AUTH_PAGE_SIGN_IN_TITLE,
    INVALID_EMAIL_DOMAIN,
    SIGNIN_ACCOUNT_NOT_FOUND_CODE,
    SIGNIN_ACCOUNT_NOT_FOUND_ERROR_MESSAGE,
    SIGNIN_INVALID_EMAIL_DOMAIN_CODE,
    SIGNIN_INVALID_EMAIL_DOMAIN_ERROR_MESSAGE
} from "../../utils/constant";
import storageTool from "../../utils/storageTools";
import googleTools from "../../utils/googleTools";
import ErrorMessage from "../ErrorMessage";
import LoadingEffect from "../LoadingEffect";

function SignInContent() {
    const history = useHistory();
    const [googleSignInErrorMessage, setGoogleSignInErrorMessage] = useState("");
    const [localSignInErrorMessage, setLocalSignInErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
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
        console.log(data);
        setIsLoading(false);
        storageTool.saveToken(data.accessToken);
        history.push("/home");
    }

    function handleSignInLocalFail(response, status, message) {
        console.log(response);
        setIsLoading(false);
        setLocalSigninValue({
            username: username,
            password: ""
        })
        if (message === "Network Error") {
            history.push(createNetworkError());
            return;
        }
        setLocalSignInErrorMessage("Username or password is invalid");
    }

    useEffect(() => {
        //Set title
        document.title = AUTH_PAGE_SIGN_IN_TITLE;

        //Initialization
        const option = document.querySelector(".auth-page .content .sign-in .sign-in__option");
        const optionKeydownIcon = document.querySelector(".auth-page .content .sign-in .sign-in__option i");
        const localSignInForm = document.getElementById("form-sign-in-local");

        //Start
        (() => {
            googleTools.insetGoogleAPIScript("google-signin", onSignIn, onFailure);
            option.addEventListener("click", handleOptionClickEvent);
        })();

        function onSignIn(googleUser) {
            setIsLoading(true);
            const id_token = googleUser.getAuthResponse().id_token;
            authApi.signInGoogle(id_token, handleSignInSuccess, handleSignInFailed);
        }

        function onFailure(error) {
            console.log(error);
        }

        function handleSignInSuccess(data) {
            console.log(data);
            setIsLoading(false);
            storageTool.saveToken(data.accessToken);
            history.push("/home");
        }

        function handleSignInFailed(response, status, message) {
            setIsLoading(false);
            console.log(response);

            if (status === SIGNIN_ACCOUNT_NOT_FOUND_CODE && message === ACCOUNT_NOT_FOUND) {
                setGoogleSignInErrorMessage(SIGNIN_ACCOUNT_NOT_FOUND_ERROR_MESSAGE);
                return;
            }
            if (status === SIGNIN_INVALID_EMAIL_DOMAIN_CODE && message === INVALID_EMAIL_DOMAIN) {
                setGoogleSignInErrorMessage(SIGNIN_INVALID_EMAIL_DOMAIN_ERROR_MESSAGE);
                return;
            }
            if (message === "Network Error") {
                history.push(createNetworkError());
                return;
            }
            history.push(createUnknownError(message));
        }

        function handleOptionClickEvent() {
            optionKeydownIcon.classList.toggle("rotate");
            localSignInForm.classList.toggle("active")
        }

        return () => {
            option?.removeEventListener("click", handleOptionClickEvent);
            setIsLoading(false);
        }
    }, [history, setIsLoading]);

    return (
        <div className="sign-in">
            <div className="sign-in__headline">Welcome Back</div>
            <div className="google">
                <div className="google__button" id="google-signin">
                    <span className="google__icon"></span>
                    <span className="google__text">Sign in with Google</span>
                </div>
            </div>
            {
                googleSignInErrorMessage ?
                    <ErrorMessage message={googleSignInErrorMessage} />
                    :
                    null
            }
            <div className="sign-in__signup-link">
                Do not sign up yet?
                <a href="/auth/sign-up">Sign up </a>
            </div>
            <p className="sign-in__option">
                More
                <i className="material-icons">keyboard_arrow_down</i>
            </p>
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
            {isLoading ? <LoadingEffect /> : null}
        </div>
    );
}

export default SignInContent;