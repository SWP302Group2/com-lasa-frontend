import { useEffect } from "react";
import { useHistory } from "react-router";
import { AUTH_PAGE_ADMIN_TITLE } from "../../../utils/constant";
import cookieTools from "../../../utils/cookieTools";
import authApi from "../../../api/authApi";
import "../css/signInLocalBox.css";

function SignInLocalBox() {
    const history = useHistory();
    useEffect(() => {
        //Set title
        document.title = AUTH_PAGE_ADMIN_TITLE;

        //Remove active id
        const activeElm = document.querySelector("#active");
        activeElm?.removeAttribute("id");

        //Active sign in google link in AuthSwitchBox
        const signInLocalLink = document.querySelector(".auth-box-switch__link--signin-local");
        signInLocalLink?.setAttribute("id", "active");

        (function handleSigninLocalForm() {
            const username = document.querySelector("#username");
            const password = document.querySelector("#password");
            username.addEventListener("input", hideErrorMessage);
            password.addEventListener("input", hideErrorMessage);

            const form = document.querySelector("#form-local-sign-in");
            form.addEventListener("submit", authenticateUser);
        })();

        function hideErrorMessage() {
            const errorMessage = document.querySelector("#error-message");
            if (errorMessage && errorMessage.style.display) {
                errorMessage.innerHTML = "";
                errorMessage.style.display = null;
            }
        }

        function authenticateUser(event) {
            event.preventDefault();
            const username = document.querySelector("#username").value;
            const password = document.querySelector("#password").value;

            authApi.signInLocal(username, password)
                .then(handleSignInSuccess)
                .catch(response => handleSignInFail(response, username));
        }

        function handleSignInSuccess(cookieData) {
            console.log("Sign in success, cookie data: " + cookieData);
            cookieTools.saveToken(cookieData);
            history.push("/home");
        }

        function handleSignInFail(response, username) {
            document.querySelector("#username").value = username;
            document.querySelector("#password").value = "";

            const status = response?.status;
            const message = response?.message;
            processError(username, status, message);
        }


        function processError(username, status, message) {
            //Display error to user
            const errorMessage = document.querySelector("#error-message");
            errorMessage.innerHTML = "Your username or password is incorrect.";
            errorMessage.style.display = "inline-block";

            //Wait the error end
            setTimeout(() => hideErrorMessage(), 10000);
            console.log("Error. username: " + username + ", status: " + status + ", message: " + message);
        }

    });

    return (
        <div className="sign-in-local">
            <h2 className="sign-in-local__headline">Sign in</h2>
            <form className="sign-in-local__form" id="form-local-sign-in">
                <div className="sign-in-local__control">
                    <input
                        className="sign-in-local__input"
                        id="username"
                        type="text"
                        name="username"
                        placeholder=" "
                    />
                    <label className="sign-in-local__label" htmlFor="username">
                        Username
                    </label>
                </div>
                <div className="sign-in-local__control">
                    <input
                        className="sign-in-local__input"
                        id="password"
                        type="password"
                        name="password"
                        placeholder=" "
                    />
                    <label className="sign-in-local__label" htmlFor="password">
                        Password
                    </label>
                </div>
                <button
                    className="sign-in-local__button"
                    type="submit"
                    name="btAction"
                    value="sign-in"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default SignInLocalBox;