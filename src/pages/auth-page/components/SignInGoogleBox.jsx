import { useEffect } from "react";
import { useHistory } from "react-router";
import authApi from "../../../api/authApi";
import { AUTH_PAGE_SIGN_IN_TITLE, CLIENT_ID } from "../../../utils/constant";
import cookieTools from "../../../utils/cookieTools";
import "../css/signInGoogleBox.css"

function SignInGoogleBox() {
    const history = useHistory();
    useEffect(() => {
        //Set title
        document.title = AUTH_PAGE_SIGN_IN_TITLE;

        //Remove active id
        const activeElm = document.querySelector("#active");
        activeElm?.removeAttribute("id");

        //Active sign in google link in AuthSwitchBox
        const signInGoogleLink = document.querySelector(".auth-box-switch__link--signin-google");
        signInGoogleLink?.setAttribute("id", "active");

        //Insert google api script
        function insetGoogleAPIScript() {
            const script = document.createElement("script");
            script.src = "https://apis.google.com/js/api:client.js";
            script.addEventListener("load", loadGoogleSignIn);
            document.body.appendChild(script);

            return script;
        }


        function loadGoogleSignIn() {
            window.gapi.load("auth2", () => {
                const button = document.getElementById("google-signin");
                const myauth2 = initializeGapiAuth2();
                myauth2.attachClickHandler(button, {}, onSignIn, onFailure);
            });
        }

        function initializeGapiAuth2() {
            return window.gapi.auth2.init({
                client_id: CLIENT_ID,
                cookiepolicy: "single_host_origin",
                scope: "profile email",
                access_type: "offline",
            });
        }

        //Sign in google success then call API to auth
        function onSignIn(googleUser) {
            const id_token = googleUser.getAuthResponse().id_token;
            console.log(id_token);
            authApi.signInGoogle(id_token)
                .then(handleSignInSuccess)
                .catch(handleSignInFail);
        }

        //SIgn in google false
        function onFailure(error) {
            console.log("Error: " + error);
        }


        function handleSignInSuccess(cookieData) {
            console.log("Sign in success, cookie data: " + cookieData.accessToken);
            cookieTools.saveToken(cookieData);
            history.push("/home");
        }

        function handleSignInFail(response) {
            const status = response?.status;
            const message = response?.data;

            console.log(`Status ${status}, Message ${message}`);
            if (status === 401 && message === "Account not found") {
                history.push("/auth/sign-up-google");
            }
        }

        insetGoogleAPIScript();
    });

    return (
        <div className="sign-in-google">
            <h1 className="sign-in-google__headline">Welcome back!</h1>
            <p className="sign-in-google__title">
                Sign in as Lecturer or Student
            </p>
            <div className="sign-in-google__button">
                <div id="google-signin">
                    <span className="sign-in-google__icon"></span>
                    <span className="sign-in-google__text">Sign in with Google</span>
                </div>
            </div>
        </div>
    );
}

export default SignInGoogleBox;