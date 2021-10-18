import { useEffect } from "react";
import { useSelector } from "react-redux";

function Verification() {
    const signupInfo = useSelector(state => state.signup);

    useEffect(() => {
        console.log("verifyStatus");
        console.log(signupInfo.verifyStatus);

    }, [signupInfo])
    return (
        <div className="sign-up__step  verify">
            {signupInfo.verifyStatus ?
                <>
                    <div className="sign-up__step__title">
                        <i className="verify__success-icon material-icons">check_circle</i>
                        You have signed up successfully
                    </div>
                    <div className="verify__message">
                        If you are a lecturer, please wait for us to verify your email. Results will be sent to the email
                        you used to sign up. <a className="verify__link" href="/home">Go schedule now</a>
                    </div>
                </>
                :
                <>
                    <div className="sign-up__step__title">
                        <i className="verify__fail-icon material-icons">highlight_off</i>
                        Something gone wrong
                    </div>
                    <div className="verify__message">
                        Sorry about that. Please contact us for more information.
                    </div>
                </>
            }
        </div>
    );
}

export default Verification;