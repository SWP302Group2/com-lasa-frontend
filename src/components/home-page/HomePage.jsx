import Header from "../Header";
import "../../assets/css/homePage.css";
import { useDispatch, useSelector } from "react-redux";
import authApi from "../../api/authApi";
import { newUserInfo, updateUserInfo } from "../../redux/actions/user";
import React, { useEffect, useState } from "react";
import LoadingEffect from "../LoadingEffect";
import { createNetworkError } from "../../redux/actions/error";
import { useHistory, Switch, Route, Redirect } from "react-router-dom";
import storageTools from "../../utils/storageTools";
import { HOME_PAGE_TITLE } from "../../utils/constant";
import WelcomeContent from "./WelcomeContent";
import SearchContent from "../search-page/SearchContent";


function HomePage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const role = useSelector(state => state.user.role);
    const [accessToken, setAccessToken] = useState(storageTools.getAccessToken());

    useEffect(() => {
        let isMounted = true;
        document.title = HOME_PAGE_TITLE;
        processUserAuth();

        function processUserAuth() {
            if (!isMounted) return;

            setIsLoading(true);
            authApi.getCurrentUserInfo(onGetSuccess, onGetFail);
        }

        function onGetSuccess(fetchedData) {
            if (!isMounted) return;
            console.log("Homepage - get userinfo success:");
            console.log(fetchedData);
            dispatch(updateUserInfo({
                role: fetchedData.role,
                ...fetchedData.information
            }));
            setIsLoading(false);
        }

        function onGetFail(response, status, message) {
            if (!isMounted) return;
            console.log("HOmepage get userinfo has failed: ");
            console.log(message);

            setAccessToken("");
            storageTools.removeAccessToken();
            dispatch(newUserInfo());
            setIsLoading(false);

            if (message === "Network Error") {
                history.push(createNetworkError());
            }
        }

        return () => {
            isMounted = false;
        }
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
                        component={SearchContent}
                    />
                    :
                    <Redirect to="/auth" />
                }
            </Switch>
            {isLoading ? <LoadingEffect /> : null}
        </section>
    );
}

export default HomePage;