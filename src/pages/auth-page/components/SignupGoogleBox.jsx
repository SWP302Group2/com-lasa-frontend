import { useEffect } from "react";
import { AUTH_PAGE_SIGN_UP_TITLE } from "../../../utils/constant";
import GoogleSignUpLecturer from "./GoogleSignUpLecturer";
import GoogleSignUpStudent from "./GoogleSignUpStudent";
import "../css/signupGoogleBox.css";

function SignupGoogleBox() {
    useEffect(() => {
        //Set title
        document.title = AUTH_PAGE_SIGN_UP_TITLE;

        //Remove active id
        const activeElm = document.querySelector("#active");
        activeElm?.removeAttribute("id");

        //Active sign in google link in AuthSwitchBox
        const signUpGoogleLink = document.querySelector(".auth-box-switch__link--signup-google");
        signUpGoogleLink?.setAttribute("id", "active");

    })

    return (
        <div className="sign-up-google">
            <h1 className="sign-up-google__headline">Glad to see you.</h1>
            <p className="sign-up-google__title">Welcome to Lecturer Appointment Schedule Application</p>
            <GoogleSignUpStudent />
            <GoogleSignUpLecturer />
        </div>
    );
}

export default SignupGoogleBox;