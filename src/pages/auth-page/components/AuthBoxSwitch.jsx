import { Link } from "react-router-dom";
import "../css/authBoxSwitch.css";

function AuthBoxSwitch() {
    return (
        <div className="auth-box-switch">
            <Link
                className="auth-box-switch__link auth-box-switch__link--signin-google"
                to="/auth/sign-in-google"
            >
                <i className="auth-box-switch__icon material-icons">login</i>
                <p className="auth-box-switch__name">Sign in</p>
            </Link>
            <Link
                className="auth-box-switch__link auth-box-switch__link--signup-google"
                to="/auth/sign-up-google"
            >
                <i className="auth-box-switch__icon material-icons">person_add</i>
                <p className="auth-box-switch__name">Sign up</p>
            </Link>
            <Link
                className="auth-box-switch__link auth-box-switch__link--signin-local"
                to="/auth/sign-in-local"
            >
                <i className="auth-box-switch__icon material-icons">manage_accounts</i>
                <p className="auth-box-switch__name">Manager</p>
            </Link>
        </div>
    );
}

export default AuthBoxSwitch;