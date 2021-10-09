import { Redirect, Route } from "react-router-dom";
import cookieTools from "./cookieTools";

function SignOutRoute({ ...rest }) {
    (function processSignOut() {
        cookieTools.removeAccessToken();
    })();

    return (
        <Route
            {...rest}
            render={() => {
                return <Redirect to="/auth" />;
            }}
        />
    );
}

export default SignOutRoute;