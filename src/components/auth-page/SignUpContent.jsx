import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../../assets/css/signUpContent.css";
import { AUTH_PAGE_SIGN_UP_TITLE } from "../../utils/constant";
import MoreInfo from "./MoreInfo";
import InputAndConfirm from "./InputAndConfirm";
import StartedWithFPTEmail from "./StartedWithFPTEmail";
import Verification from "./Verification";

function SignUpContent() {
    const signupInfo = useSelector(state => state.signup);
    const [position, setPosition] = useState(1);

    useEffect(() => {
        //Init
        const checkpoints = document.querySelectorAll(".auth-page .sign-up .sign-up__checkpoint");

        //START
        (() => {
            document.title = AUTH_PAGE_SIGN_UP_TITLE;
            [...checkpoints].forEach((checkpoint) => {
                checkpoint.addEventListener("click", handleCheckPointClickEvent)
            });
            [...checkpoints].forEach((checkpoint, index) => {
                index >= signupInfo.processPosition ?
                    checkpoint.classList.remove("active") : checkpoint.classList.add("active");
            });
        })();

        function handleCheckPointClickEvent(event) {
            const data = Number.parseInt(event.target.getAttribute("data"));
            console.log(`${data} and ${signupInfo.processPosition}`);
            if (signupInfo.verifyStatus != null) {
                return;
            }
            if (data <= signupInfo.processPosition) {
                setPosition(data);
            }
        }

        return () => {
            [...checkpoints].forEach((checkpoint) => {
                checkpoint.removeEventListener("click", handleCheckPointClickEvent)
            });
        }
    }, [position, signupInfo]);

    return (
        <div className="sign-up">
            <div className="sign-up__process">
                <div className="sign-up__checkpoint" data="1">1</div>
                <div className="sign-up__checkpoint" data="2">2</div>
                <div className="sign-up__checkpoint" data="3">3</div>
                <div className="sign-up__checkpoint" data="4">4</div>
            </div>

            {position === 1 ? <StartedWithFPTEmail setPosition={setPosition} /> : null}
            {position === 2 ? <MoreInfo setPosition={setPosition} /> : null}
            {position === 3 ? <InputAndConfirm setPosition={setPosition} /> : null}
            {position === 4 ? <Verification /> : null}
            <div className="sign-up__signin-link">
                Already have an account?
                <a href="/auth/sign-in">Sign in </a>
            </div>
        </div>
    );
}

export default SignUpContent;