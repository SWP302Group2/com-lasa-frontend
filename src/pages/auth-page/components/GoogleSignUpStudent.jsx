import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import authApi from "../../../api/authApi";
import { CLIENT_ID } from "../../../utils/constant";
import cookieTools from "../../../utils/cookieTools";
import googleTools from "../../../utils/googleTools";

function GoogleSignUpStudent() {
    const history = useHistory();
    useEffect(() => {
        //Start
        (function insetGoogleAPIScript() {
            const script = googleTools.addGapiScriptToDOM();
            script.addEventListener("load", loadGoogleSignIn);
        })();

        function loadGoogleSignIn() {
            window.gapi.load("auth2", () => {
                const button = document.getElementById("google-signup-student");
                const auth2 = googleTools.initialGapiAuth2(CLIENT_ID);
                auth2.attachClickHandler(button, {}, onSignIn, onFailure);
            });
        }

        //Sign in google success then call API to auth
        function onSignIn(googleUser) {
            const id_token = googleUser.getAuthResponse().id_token;
            authApi.signUpStudent(id_token)
                .then(handleSignInSuccess)
                .catch(handleSignInFail);
        }

        function onFailure(error) {
            console.log(error);
        }

        function handleSignInSuccess(cookieData) {
            console.log("Sign up success, cookie data:");
            console.log(cookieData);
            cookieTools.saveToken(cookieData);
            history.push("/home");
        }

        function handleSignInFail(response) {
            const status = response?.status;
            const message = response?.status;
            console.log(`Status ${status}, Message ${message}`);
        }
    }, [history]);

    return (
        <div className="sign-up-google__button">
            <div id="google-signup-student">
                <span className="sign-up-google__icon"></span>
                <span className="sign-up-google__text">Sign up as Student</span>
            </div>
        </div>
    );
}

export default GoogleSignUpStudent;