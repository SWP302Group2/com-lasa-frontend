import { Switch, Route, useHistory } from "react-router-dom";
import authApi from "../../api/authApi";
import SignInContent from "./SignInContent";
import SignUpContent from "./SignUpContent";
import "../../assets/css/authPage.css";
import Logo from "../Logo";
import { useEffect } from "react";
import { createNetworkError } from "../../redux/actions/error";
import storageTools from "../../utils/storageTools";
import { newUserInfo } from "../../redux/actions/user";
import { useDispatch } from "react-redux";

function AuthPage() {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(callApiCheckAuthentication, [history, dispatch])

    function callApiCheckAuthentication() {
        let mounted = true;
        checkAuth();

        function checkAuth() {
            authApi.getCurrentUserInfo(
                handleAutoSigninSuccess,
                handleAutoSigninFailed
            );
        }

        function handleAutoSigninSuccess(data) {
            dispatch(newUserInfo({
                role: data.role,
                ...data.information
            }))
            history.push("/home");
        }

        function handleAutoSigninFailed(response, status, message) {
            console.log("Auto signin has failed:")
            console.log(response)

            storageTools.removeAccessToken();
            if (mounted) {
                dispatch(newUserInfo());
            }

            if (status >= 500 && message === "Network Error") {
                history.push(createNetworkError());
            }
        }

        return () => {
            mounted = false;
        }
    }

    return (
        <section className="auth-page">
            <div className="content">
                <Logo />
                <Switch>
                    <Route
                        exact path="/auth"
                        component={SignInContent} />
                    <Route
                        exact path="/auth/sign-in"
                        component={SignInContent} />
                    <Route
                        exact path="/auth/sign-up"
                        component={SignUpContent} />
                </Switch>
            </div>
        </section>
    );
}

export default AuthPage;