import { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import storageTools from "./storageTools";

function CheckAuthenRoute({ component: Component, role, ...rest }) {
    const accessToken = storageTools.getAccessToken();
    console.log("Authorization: ");
    console.log(accessToken);
    console.log(role);
    const isAuthenticated = accessToken != null && role != null;

    useEffect(() => {

    }, [role])
    return (
        <Route
            {...rest}
            render={() =>
                isAuthenticated ? <Component /> : <Redirect to="/auth/sign-in" />
            }
        />
    );
}

export default CheckAuthenRoute;