import { Switch, Route, useHistory } from "react-router-dom";
import authApi from "../../api/authApi";
import SignInContent from "./SignInContent";
import SignUpContent from "./SignUpContent";
import "../../assets/css/authPage.css";
import Logo from "../Logo";
import { useState, useEffect } from "react";
import LoadingEffect from "../LoadingEffect.jsx";
import { createNetworkError } from "../../redux/actions/error";
import storageTools from "../../utils/storageTools";
import { newUserInfo } from "../../redux/actions/user";
import { useDispatch } from "react-redux";

function AuthPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(callApiCheckAuthentication, [history, dispatch])

    function callApiCheckAuthentication() {
        checkAuth();

        function checkAuth() {
            setIsLoading(true);
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
            setIsLoading(false);
            history.push("/home");
        }

        function handleAutoSigninFailed(response, status, message) {
            console.log("Auto signin has failed:")
            console.log(message)

            storageTools.removeAccessToken();
            dispatch(newUserInfo());
            setIsLoading(false);

            if (status >= 500 && message === "Network Error") {
                history.push(createNetworkError());
            }
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
            {isLoading ? <LoadingEffect /> : null}
        </section>
    );
}

export default AuthPage;