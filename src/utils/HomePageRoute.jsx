import { Redirect, Route } from "react-router-dom";
import cookieTools from "./cookieTools";

function HomePageRoute({ component: Component, ...rest }) {
    const isAuthenticate = () => {
        return !!cookieTools.getAccessToken();
    }

    return (
        <Route
            {...rest}
            render={() => {
                return isAuthenticate() ? <Component /> : <Redirect to="/auth" />
            }}
        />
    );
}

export default HomePageRoute;