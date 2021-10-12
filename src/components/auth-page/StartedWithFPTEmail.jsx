import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import authApi from "../../api/authApi";
// import authApi from "../../api/authApi";
import { createNetworkError, createUnknownError } from "../../redux/actions/error";
import { newSignUpInfo } from "../../redux/actions/signup";
import {
    EMAIL_ALREADY_EXIST,
    INVALID_EMAIL_DOMAIN,
    SIGNUP_EMAIL_ALREADY_EXIST_CODE,
    SIGNUP_EMAIL_ALREADY_EXIST_ERROR_MESSAGE,
    SIGNUP_INVALID_EMAIL_DOMAIN_CODE,
    SIGNUP_INVALID_EMAIL_DOMAIN_ERROR_MESSAGE
} from "../../utils/constant";

import googleTools from "../../utils/googleTools";
import ErrorMessage from "../ErrorMessage";

function StartedWithFPTEmail({ setPosition }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        //Start
        (() => {
            googleTools.insetGoogleAPIScript("google-signup", onSignIn, onFailure);
        })();

        function onSignIn(googleUser) {
            const id_token = googleUser.getAuthResponse().id_token;
            authApi.checkSignUpEmail(
                id_token,
                onVerifyEmailSuccess,
                onVerifyEmailFailure
            )
        }

        function onFailure(error) {
            console.log({ error });
        }

        function onVerifyEmailSuccess(userInfo) {
            const signupInfo = {
                userInfo: {
                    token: userInfo.googleToken,
                    name: userInfo.name,
                    avatarUrl: userInfo.avatarUrl,
                    email: userInfo.email
                },
                processPosition: 2
            }
            dispatch(newSignUpInfo(signupInfo));
            setPosition(2);
        }

        function onVerifyEmailFailure(response) {
            console.log(response);
            const status = response?.data?.status || response?.status;
            const message = response?.data?.message || response?.message;

            if (status === SIGNUP_INVALID_EMAIL_DOMAIN_CODE && message === INVALID_EMAIL_DOMAIN) {
                setErrorMessage(SIGNUP_INVALID_EMAIL_DOMAIN_ERROR_MESSAGE);
                return;
            }
            if (status === SIGNUP_EMAIL_ALREADY_EXIST_CODE && message === EMAIL_ALREADY_EXIST) {
                setErrorMessage(SIGNUP_EMAIL_ALREADY_EXIST_ERROR_MESSAGE);
                return;
            }

            if (response.message === "Network Error") {
                history.push(createNetworkError());
                return;
            }
            history.push(createUnknownError(message));
        }

    }, [dispatch, history, setPosition]);

    return (
        <div className="sign-up__step  start-with-email">
            <div className="sign-up__step__title">
                Get started with FPT email.
            </div>
            <div className="google">
                <div className="google__button" id="google-signup">
                    <span className="google__icon"></span>
                    <span className="google__text">Sign up with Google</span>
                </div>
            </div>
            {
                errorMessage ?
                    <ErrorMessage message={errorMessage} />
                    :
                    null
            }
        </div>
    );
}

export default StartedWithFPTEmail;