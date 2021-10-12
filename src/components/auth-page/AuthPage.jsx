import { useDispatch } from "react-redux";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import authApi from "../../api/authApi";
import cookieTools from "../../utils/cookieTools";
import SignInContent from "./SignInContent";
import SignUpContent from "./SignUpContent";
import "../../assets/css/authPage.css";
import Logo from "../Logo";
import { useState } from "react";
import LoadingEffect from "../LoadingEffect.jsx";
import { useEffect } from "react";
import { createNetworkError, createUnknownError } from "../../redux/actions/error";

function AuthPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        //Start
        (() => {
            checkUserAuth();
        })();

        function checkUserAuth() {
            setIsLoading(true);
            authApi.getCurrentUserInfo(handleGetInfoSuccess, handleGetInfoFail);
        }

        function handleGetInfoSuccess() {
            setIsLoading(false);
            history.push("/home");
        }

        function handleGetInfoFail(response) {
            const status = response?.data?.status || response?.status;
            const message = response?.data?.message || response?.message;
            console.log(`${status}, ${message}`);
            cookieTools.removeAccessToken();
            setIsLoading(false);

            if (message === "ACCESS_TOKEN_NOT_EXIST") {
                //if not exist we continue lo sign in
                return;
            }
            if (message === "Network Error") {
                history.push(createNetworkError());
                return
            }
            history.push(createUnknownError(message));
        }

        return () => {
            setIsLoading(false);
        }
    }, [dispatch, history])


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

                    <Redirect to="/page-not-found" />
                </Switch>
            </div>
            {isLoading ? <LoadingEffect /> : null}
        </section>
    );
}

export default AuthPage;