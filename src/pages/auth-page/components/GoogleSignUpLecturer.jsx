import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import authApi from "../../../api/authApi";
import { CLIENT_ID } from "../../../utils/constant";
import cookieTools from "../../../utils/cookieTools";
import googleTools from "../../../utils/googleTools";

function GoogleSignUpLecturer() {
    const history = useHistory();
    useEffect(() => {
        //Start
        (function insetGoogleAPIScript() {
            const script = googleTools.addGapiScriptToDOM();
            script.addEventListener("load", loadGoogleSignIn);
        })();

        function loadGoogleSignIn() {
            window.gapi.load("auth2", () => {
                const button = document.getElementById("google-signup-lecturer");
                const auth2 = googleTools.initialGapiAuth2(CLIENT_ID);
                auth2.attachClickHandler(button, {}, onSignIn, onFailure);
            });
        }

        function onSignIn(googleUser) {
            const id_token = googleUser.getAuthResponse().id_token;
            authApi.signUpStudent(id_token)
                .then(handleSignUpSuccess)
                .catch(handleSignUpFail);
        }

        function onFailure(error) {
            console.log(error);
        }

        function handleSignUpSuccess(cookieData) {
            console.log("Sign up success, cookie data:");
            console.log(cookieData);
            cookieTools.saveToken(cookieData);
            history.push("/home");
        }

        function handleSignUpFail(response) {
            const status = response?.status;
            const message = response?.status;
            console.log(`Status ${status}, Message ${message}`);
        }
    }, [history]);

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