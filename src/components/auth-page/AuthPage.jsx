import { useDispatch } from "react-redux";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import authApi from "../../api/authApi";
import { updateUserInfo } from "../../redux/actions/user";
import cookieTools from "../../utils/cookieTools";
import SignInContent from "./SignInContent";
import SignUpContent from "./SignUpContent";
import "../../assets/css/authPage.css";
import Logo from "../Logo";

function AuthPage() {
    const dispatch = useDispatch();
    const history = useHistory();

    (function checkUserAuth() {
        authApi
            .getCurrentUserInfo()
            .then(handleGetInfoSuccess)
            .catch(handleGetInfoFail);
    })();

    function handleGetInfoSuccess(fetchedData) {
        console.log("Dispatch user info: ");
        console.log(fetchedData);

        const action = updateUserInfo(fetchedData);
        dispatch(action);
        history.push("/home");
    }

    function handleGetInfoFail(response) {
        console.log(response.message || response);
        cookieTools.removeAccessToken();
    }


    return (
        <section className="auth-page">
            <div className="content">
                <Logo />
                <Switch>
                    <Route
                        exact path="/auth/sign-in"
                        component={SignInContent} />
                    <Route
                        exact path="/auth/sign-up"
                        component={SignUpContent} />

                    <Redirect to="/page-not-found" />
                </Switch>
            </div>
        </section>
    );
}

export default AuthPage;