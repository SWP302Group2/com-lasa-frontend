import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/signInContent.css";
import { AUTH_PAGE_SIGN_IN_TITLE } from "../../utils/constant";
import LoadingEffect from "../LoadingEffect";
import GoogleSignin from "./GoogleSignin";
import LocalSignin from "./LocalSignin";

function SignInContent() {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        //Initialization
        const option = document.querySelector(".auth-page .content .sign-in .sign-in__option");
        const optionKeydownIcon = document.querySelector(".auth-page .content .sign-in .sign-in__option i");
        const localSignInForm = document.getElementById("form-sign-in-local");

        document.title = AUTH_PAGE_SIGN_IN_TITLE;
        option.addEventListener("click", handleOptionClickEvent);

        function handleOptionClickEvent() {
            optionKeydownIcon.classList.toggle("rotate");
            localSignInForm.classList.toggle("active")
        }

        return () => {
            option?.removeEventListener("click", handleOptionClickEvent);
            setIsLoading(false);
        }
    }, [setIsLoading]);

    return (
        <div className="sign-in">
            <GoogleSignin setIsLoading={setIsLoading} />
            <div className="sign-in__signup-link">
                Do not sign up yet?
                <Link to="/auth/sign-up">Sign up </Link>
            </div>
            <p className="sign-in__option">
                More
                <i className="material-icons">keyboard_arrow_down</i>
            </p>
            <LocalSignin setIsLoading={setIsLoading} />
            {isLoading ? <LoadingEffect /> : null}
        </div>
    );
}

export default SignInContent;