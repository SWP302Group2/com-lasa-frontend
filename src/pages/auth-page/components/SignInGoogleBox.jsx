import { useEffect } from "react";
import { useHistory } from "react-router";
import authApi from "../../../api/authApi";
import { AUTH_PAGE_SIGN_IN_TITLE, CLIENT_ID } from "../../../utils/constant";
import cookieTools from "../../../utils/cookieTools";
import googleTools from "../../../utils/googleTools";
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

        //Start
        (function insetGoogleAPIScript() {
            const script = googleTools.addGapiScriptToDOM();
            script.addEventListener("load", loadGoogleSignIn);
        })();

        function loadGoogleSignIn() {
            window.gapi.load("auth2", () => {
                const button = document.getElementById("google-signin");
                const auth2 = googleTools.initialGapiAuth2(CLIENT_ID);
                auth2.attachClickHandler(button, {}, onSignIn, onFailure);
            });
        }

        function onSignIn(googleUser) {
            const id_token = googleUser.getAuthResponse().id_token;
            console.log(id_token);
            authApi.signInGoogle(id_token)
                .then(handleSignInSuccess)
                .catch(handleSignInFail);
        }

        function onFailure(error) {
            console.log({ error });
        }


        function handleSignInSuccess(cookieData) {
            console.log("Sign up success, cookie data:");
            console.log(cookieData);
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
    }, [history]);

    return (
        <div className="sign-in-google">
            <h1 className="sign-in-google__headline">Welcome back!</h1>
            <p className="sign-in-google__title">
                Sign in as Lecturer or Student
            </p>

        </div>
    );
}

export default SignInGoogleBox;