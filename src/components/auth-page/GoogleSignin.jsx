import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import authApi from "../../api/authApi";
import { createNetworkError, createUnknownError } from "../../redux/actions/error";
import { newUserInfo } from "../../redux/actions/user";
import {
    ACCOUNT_NOT_ENABLE,
    ACCOUNT_NOT_FOUND,
    INVALID_EMAIL_DOMAIN,
    SIGNIN_ACCOUNT_NOT_ENABLE_CODE,
    SIGNIN_ACCOUNT_NOT_ENABLE_ERROR_MESSAGE,
    SIGNIN_ACCOUNT_NOT_FOUND_CODE,
    SIGNIN_ACCOUNT_NOT_FOUND_ERROR_MESSAGE,
    SIGNIN_INVALID_EMAIL_DOMAIN_CODE,
    SIGNIN_INVALID_EMAIL_DOMAIN_ERROR_MESSAGE
} from "../../utils/constant";
import googleTools from "../../utils/googleTools";
import storageTools from "../../utils/storageTools";
import ErrorMessage from "../ErrorMessage";

function GoogleSignin({ setIsLoading }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [googleSignInErrorMessage, setGoogleSignInErrorMessage] = useState("");

    useEffect(() => {
        googleTools.insetGoogleApiScript("google-signin", onSignIn, onFailure);

        function onSignIn(googleUser) {
            setIsLoading(true);
            const id_token = googleUser.getAuthResponse().id_token;

            //Time expired
            if (!id_token) {
                setIsLoading(false);
                history.push("/auth/sign-up")
            }

            authApi.signInGoogle(id_token, handleSignInSuccess, handleSignInFailure);
        }

        function onFailure(error) {
            console.log("Sign in Google side has failed");
            console.log(error);
        }

        function handleSignInSuccess(data) {
            console.log("Google sign-in success: ");
            console.log(data);

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
            console.log("Failed to get userinfo when sign in");
            handleSignInFailure(response, status, message);
        }

        function handleSignInFailure(response, status, message) {
            console.log("Google sign in has failed: ");
            console.log(response);

            dispatch(newUserInfo());
            storageTools.removeAccessToken();
            setIsLoading(false);

            if (status === SIGNIN_ACCOUNT_NOT_ENABLE_CODE && message === ACCOUNT_NOT_ENABLE) {
                setGoogleSignInErrorMessage(SIGNIN_ACCOUNT_NOT_ENABLE_ERROR_MESSAGE);
                return;
            }
            if (status === SIGNIN_ACCOUNT_NOT_FOUND_CODE && message === ACCOUNT_NOT_FOUND) {
                setGoogleSignInErrorMessage(SIGNIN_ACCOUNT_NOT_FOUND_ERROR_MESSAGE);
                return;
            }
            if (status === SIGNIN_INVALID_EMAIL_DOMAIN_CODE && message === INVALID_EMAIL_DOMAIN) {
                setGoogleSignInErrorMessage(SIGNIN_INVALID_EMAIL_DOMAIN_ERROR_MESSAGE);
                return;
            }
            if (status >= 500) {
                history.push(createNetworkError());
                return;
            }
            history.push(createUnknownError(message));
        }
    }, [dispatch, history, setIsLoading, setGoogleSignInErrorMessage])

    return (
        <React.Fragment>
            <div className="sign-in__headline">Welcome Back</div>
            <div className="google">
                <div className="google__button" id="google-signin">
                    <span className="google__icon"></span>
                    <span className="google__text">Sign in with Google</span>
                </div>
            </div>
            {googleSignInErrorMessage ?
                <ErrorMessage message={googleSignInErrorMessage} /> : null
            }
        </React.Fragment>
    );
}

export default GoogleSignin;