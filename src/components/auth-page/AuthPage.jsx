import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import authApi from "../../api/authApi";
import SignInContent from "./SignInContent";
import SignUpContent from "./SignUpContent";
import "../../assets/css/authPage.css";
import Logo from "../Logo";
import { useState, useEffect } from "react";
import LoadingEffect from "../LoadingEffect.jsx";
import { createNetworkError } from "../../redux/actions/error";
import storageTools from "../../utils/storageTools";

function AuthPage() {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        //Start
        (() => {
            checkAuth();
        })();

        function checkAuth() {
            setIsLoading(true);
            authApi.checkValidAccessToken(
                handleValidAccessToken,
                handleInvalidAccessToken
            );
        }

        function handleValidAccessToken() {
            setIsLoading(false);
            history.push("/home");
        }

        function handleInvalidAccessToken(response, status, message) {
            console.log(response)

            storageTools.removeAccessToken();
            setIsLoading(false);

            if (message === "Network Error") {
                history.push(createNetworkError());
            }
        }
    }, [history])


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