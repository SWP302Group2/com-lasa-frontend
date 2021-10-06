import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import authApi from "../../../api/authApi";
import { CLIENT_ID } from "../../../utils/constant";
import cookieTools from "../../../utils/cookieTools";


function GoogleSignUpLecturer() {
    const history = useHistory();
    useEffect(() => {
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
                const button = document.getElementById("google-signup-lecturer");
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

            authApi.signUpLecturer(id_token)
                .then(handleSignInSuccess)
                .catch(handleSignInFail);
        }


        function handleSignInSuccess(cookieData) {
            console.log("Sign up success, cookie data: " + cookieData);
            cookieTools.saveToken(cookieData);
            history.push("/home");
        }

        function handleSignInFail(response) {
            const status = response?.status;
            const message = response?.status;

            console.log(`Status ${status}, Message ${message}`);

            if (status === 401 && message === "Account not found") {
                history.push("/sign-up");
            }
        }

        function onFailure(error) {
            console.log(error);
        }

        insetGoogleAPIScript();
    });

    return (
        <div className="sign-up-google__button">
            <div id="google-signup-lecturer">
                <span className="sign-up-google__icon"></span>
                <span className="sign-up-google__text">Sign up as Lecturer</span>
            </div>
        </div>
    );
}

export default GoogleSignUpLecturer;