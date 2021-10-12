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
    SIGNIN_INVALID_EMAIL_DOMAIN_CODE
} from "../../utils/constant";
import cookieTools from "../../utils/cookieTools";
import googleTools from "../../utils/googleTools";
import ErrorMessage from "../ErrorMessage";
import LoadingEffect from "../LoadingEffect";

function SignInContent() {
    const history = useHistory();
    const [{
        googleSignInErrorMessage,
        localSignInErrorMessage,
        isLoading
    }, setState]
        = useState({
            googleSignInErrorMessage: "",
            localSignInErrorMessage: "",
            isLoading: false
        });

    useEffect(() => {
        //Set title
        document.title = AUTH_PAGE_SIGN_IN_TITLE;

        //Initialization
        const option = document.querySelector(".auth-page .content .sign-in .sign-in__option");
        const optionKeydownIcon = document.querySelector(".auth-page .content .sign-in .sign-in__option i");
        const localSignInForm = document.getElementById("form-sign-in-local");
        const usernameBox = document.querySelector("#username");
        const passwordBox = document.querySelector("#password");

        //Start
        (() => {
            googleTools.insetGoogleAPIScript("google-signin", onSignIn, onFailure);
            option.addEventListener("click", handleOptionClickEvent);
            localSignInForm.addEventListener("submit", authenticateUser);
        })();

        function onSignIn(googleUser) {
            const id_token = googleUser.getAuthResponse().id_token;
            setState({
                googleSignInErrorMessage: "",
                localSignInErrorMessage: "",
                isLoading: true
            });
            authApi.signInGoogle(id_token, handleSignInSuccess, handleSignInFailed);
        }

        function onFailure(error) {
            console.log(error);
        }

        function handleSignInSuccess(cookieData) {
            cookieTools.saveToken(cookieData);
            history.push("/home");
        }

        function handleSignInFailed(response) {
            const status = response?.data?.status || response?.status;
            const message = response?.data?.message || response?.message;

            console.log(response);

            if (status === SIGNIN_ACCOUNT_NOT_FOUND_CODE && message === ACCOUNT_NOT_FOUND) {
                setState({
                    googleSignInErrorMessage: "Your email has not been signed up.",
                    localSignInErrorMessage: "",
                    isLoading: false
                });
                return;
            }
            if (status === SIGNIN_INVALID_EMAIL_DOMAIN_CODE && message.message === INVALID_EMAIL_DOMAIN) {
                setState({
                    googleSignInErrorMessage: "Your email is not allowed sign in to the system.",
                    localSignInErrorMessage: "",
                    isLoading: false
                });
                return;
            }
            if (response.message === "Network Error") {
                history.push(createNetworkError());
                return;
            }
            history.push(createUnknownError());
        }

        function handleOptionClickEvent() {
            optionKeydownIcon.classList.toggle("rotate");
            localSignInForm.classList.toggle("active")
        }

        function authenticateUser(event) {
            setState({
                googleSignInErrorMessage: "",
                localSignInErrorMessage: "",
                isLoading: true
            })
            event.preventDefault();
            authApi.signInLocal(
                usernameBox.value,
                passwordBox.value,
                handleSignInLocalSuccess,
                handleSignInLocalFail
            );
        }

        function handleSignInLocalSuccess(cookieData) {
            cookieTools.saveToken(cookieData);
            history.push("/home");
        }

        function handleSignInLocalFail(response, username) {
            usernameBox.value = username;
            if (response.message === "Network Error") {
                history.push(createNetworkError());
                return;
            }
            setState({
                googleSignInErrorMessage: "",
                localSignInErrorMessage: "Username or password is invalid",
                isLoading: false
            })
        }

        return () => {
            option?.removeEventListener("click", handleOptionClickEvent);
            setState({});
        }
    }, [history]);

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
                Others
                <i className="material-icons">keyboard_arrow_down</i>
            </p>
            <form className="local" id="form-sign-in-local">
                <div className="local__control">
                    <input
                        className="local__input"
                        id="username"
                        type="text"
                        name="username"
                        placeholder=" "
                    />
                    <label className="local__label" htmlFor="username">
                        Username
                    </label>
                </div>
                <div className="local__control">
                    <input
                        className="local__input"
                        id="password"
                        type="password"
                        name="password"
                        placeholder=" "
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