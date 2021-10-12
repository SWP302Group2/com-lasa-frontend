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
import cookieTools from "../../utils/cookieTools";


function HomePage() {
    const dispatch = useDispatch();
    const history = useHistory();

    //Start before render, but could end on mounted
    const [isLoading, setIsLoading] = useState(false);
    const [isSignIn, setIsSignIn] = useState(false)

    useEffect(() => {
        (() => {
            checkUserAuth();
        })();

        function checkUserAuth() {
            setIsLoading(true);
            authApi.getCurrentUserInfo(onGetSuccess, onGetFail);
        }
        function onGetSuccess(fetchedData) {
            const userInfo = {
                role: fetchedData.role,
                ...fetchedData.information
            };
            setIsLoading(false);
            setIsSignIn(true);
            dispatch(updateUserInfo(userInfo));
            console.log(userInfo);
        }
        function onGetFail(response) {
            console.log(response.message || response);
            cookieTools.removeAccessToken();
            setIsLoading(false);
            setIsSignIn(false);
            dispatch(newUserInfo());
            if (response.message === "Network Error") {
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