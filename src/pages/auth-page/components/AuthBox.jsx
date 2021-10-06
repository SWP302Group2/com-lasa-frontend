import { Switch, Route, Redirect } from "react-router-dom";
import "../css/authBox.css";
import AuthBoxSwitch from "./AuthBoxSwitch";
import SignInGoogleBox from "./SignInGoogleBox";
import SignInLocalBox from "./SignInLocalBox";
import SignupGoogleBox from "./SignupGoogleBox";
import Logo from "./Logo";

function AuthBox() {
    return (
        <div className="auth-box">
            <Logo />
            <AuthBoxSwitch />
            <Switch>
                <Route
                    exact path="/auth"
                    component={SignInGoogleBox} />
                <Route
                    exact path="/auth/sign-in-google"
                    component={SignInGoogleBox} />
                <Route
                    exact path="/auth/sign-up-google"
                    component={SignupGoogleBox} />
                <Route
                    exact path="/auth/sign-in-local"
                    component={SignInLocalBox} />
                <Redirect to="/page-not-found" />
            </Switch>
        </div>
    );
}
/* <SignInLocalForm />
            <SignInGoogle /> */

export default AuthBox;