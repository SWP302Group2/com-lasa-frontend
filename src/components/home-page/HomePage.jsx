import Header from "../Header";
import authApi from "../../api/authApi";
import "../../assets/css/homePage.css";
import { useDispatch, useSelector } from "react-redux";
import { newUserInfo, updateUserInfo } from "../../redux/actions/user";
import React, { useEffect, useState } from "react";
import LoadingEffect from "../LoadingEffect";
import { createNetworkError } from "../../redux/actions/error";
import { useHistory, Switch, Route, Redirect } from "react-router-dom";
import storageTools from "../../utils/storageTools";
import { HOME_PAGE_TITLE } from "../../utils/constant";
import WelcomeContent from "./WelcomeContent";
import SearchContent from "../search-page/SearchContent";
import DashboardContent from "../dashboard/DashboardContent";

function HomePage() {
    const [isLoading, setIsLoading] = useState(false);

    //Use old info before callAPI success
    const [accessToken, setAccessToken] = useState(storageTools.getAccessToken());
    const role = useSelector(state => state.user.role);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        let isMounted = true;
        const start = () => {
            document.title = HOME_PAGE_TITLE;
            processUserAuth();
        }
        start();

        const end = () => {
            isMounted = false;
        }

        function processUserAuth() {
            const onGetSuccess = (userInfo) => {
                if (!isMounted) return;
                console.log("Homepage - get userinfo success:");
                console.log(userInfo);
                dispatch(updateUserInfo({
                    role: userInfo.role,
                    ...userInfo.information
                }));
                setIsLoading(false);
            }

            const onGetFailure = (response, status, message) => {
                if (!isMounted) return;
                console.log("Homepage get userinfo failed: ");
                console.log(message);

                storageTools.removeAccessToken();
                dispatch(newUserInfo());
                setAccessToken("");

                if (message === "Network Error") {
                    history.push(createNetworkError());
                }
                setIsLoading(false);
            }

            setIsLoading(true);
            authApi.getCurrentUserInfo(onGetSuccess, onGetFailure);
        }

        return end;
    }, [dispatch, history, role, setAccessToken]);

    return (
        <section id="home-page">
            <Header />
            <Switch>
                <Route
                    exact path="/"
                    component={WelcomeContent}
                />
                <Route
                    exact path="/home"
                    component={WelcomeContent}
                />
                <Route
                    exact path="/welcome"
                    component={WelcomeContent}
                />
                {role && accessToken ?
                    <Route
                        exact path="/search"
                        component={SearchContent} />
                    :
                    <Redirect to="/auth" />
                }
                {role && accessToken ?
                    <Route
                        path="/dashboard"
                        component={DashboardContent} />
                    :
                    <Redirect to="/auth" />
                }

            </Switch>
            {isLoading ? <LoadingEffect /> : null}
        </section>
    );
}

export default HomePage;