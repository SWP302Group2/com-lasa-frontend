import Header from "../Header";
import Content from "./Content";
import "../../assets/css/homePage.css";
import { useDispatch } from "react-redux";
import authApi from "../../api/authApi";
import { newUserInfo, updateUserInfo } from "../../redux/actions/user";
import { useEffect, useState } from "react";
import LoadingEffect from "../LoadingEffect";
import { createNetworkError } from "../../redux/actions/error";
import { useHistory } from "react-router";
import storageTools from "../../utils/storageTools";
import { HOME_PAGE_TITLE } from "../../utils/constant";


function HomePage() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [isLoading, setIsLoading] = useState(false);
    const [isSignIn, setIsSignIn] = useState(false)

    useEffect(() => {
        //START
        (() => {
            document.title = HOME_PAGE_TITLE;
            processUserAuth();
        })();

        function processUserAuth() {
            setIsLoading(true);
            authApi.getCurrentUserInfo(onGetSuccess, onGetFail);
        }

        function onGetSuccess(fetchedData) {
            console.log(fetchedData);
            const userInfo = {
                role: fetchedData.role,
                ...fetchedData.information
            };
            setIsLoading(false);
            setIsSignIn(true);
            dispatch(updateUserInfo(userInfo));
        }

        function onGetFail(response, status, message) {
            console.log(response);

            storageTools.removeAccessToken();
            setIsLoading(false);
            setIsSignIn(false);
            dispatch(newUserInfo());

            if (message === "Network Error") {
                history.push(createNetworkError());
            }
        }
    }, [dispatch, history]);

    return (
        <section id="home-page">
            <Header isSignIn={isSignIn} />
            <Content></Content>
            {isLoading ? <LoadingEffect /> : null}
        </section>
    );
}

export default HomePage;