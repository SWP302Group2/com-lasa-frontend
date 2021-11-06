import Header from "../Header";
import authApi from "../../api/authApi";
import "../../assets/css/homePage.css";
import { useDispatch, useSelector } from "react-redux";
import { newUserInfo, updateUserInfo } from "../../redux/actions/user";
import React, { useEffect, useState } from "react";
import { createNetworkError } from "../../redux/actions/error";
import { useHistory, Switch, Route, Redirect } from "react-router-dom";
import storageTools from "../../utils/storageTools";
import { HOME_PAGE_TITLE } from "../../utils/constant";
import WelcomeContent from "./WelcomeContent";
import SearchContent from "../search-page/SearchContent";
import DashboardContent from "../dashboard/DashboardContent";
import Footer from "../Footer";

function HomePage() {
    //Use old info before callAPI success
    const [isCheckedAuth, setIsCheckedAuth] = useState(true);
    const [accessToken, setAccessToken] = useState(storageTools.getAccessToken());

    const role = useSelector(state => state.user.role);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => document.title = HOME_PAGE_TITLE, []);

    useEffect(checkAuthAndGetUserInfo, [dispatch, history, role, isCheckedAuth]);

    function checkAuthAndGetUserInfo() {
        if (isCheckedAuth === true) return;

        setIsCheckedAuth(true);
        processUserAuth();

        function processUserAuth() {
            const onGetSuccess = (userInfo) => {
                console.log("Homepage - get userinfo success:");
                console.log(userInfo);

                dispatch(updateUserInfo({
                    ...userInfo.information,
                    role: userInfo.role
                }));
            }

            const onGetFailure = (response, status, message) => {
                console.log("Homepage get userinfo failed: ");
                console.log(response);

                storageTools.removeAccessToken();
                dispatch(newUserInfo());
                setAccessToken("");

                if (message === "Network Error") {
                    //Backend server is down
                    history.push(createNetworkError());
                }
            }

            authApi.getCurrentUserInfo(onGetSuccess, onGetFailure);
        }
    }

    return (
        <section id="home-page">
            <Header />
            <Switch>
                <Route exact path="/">
                    <WelcomeContent setIsCheckedAuth={setIsCheckedAuth} />
                </Route>

                <Route exact path="/home">
                    <WelcomeContent setIsCheckedAuth={setIsCheckedAuth} />
                </Route>

                <Route exact path="/welcome">
                    <WelcomeContent setIsCheckedAuth={setIsCheckedAuth} />
                </Route>

                {role && accessToken ?
                    <Route exact path="/search">
                        <SearchContent setIsCheckedAuth={setIsCheckedAuth} />
                        <Footer />
                    </Route>
                    :
                    <Redirect to="/auth" />
                }

                {role && accessToken ?
                    <Route path="/dashboard">
                        <DashboardContent setIsCheckedAuth={setIsCheckedAuth} />
                    </Route>
                    :
                    <Redirect to="/auth" />
                }

            </Switch>
        </section>
    );
}

export default HomePage;