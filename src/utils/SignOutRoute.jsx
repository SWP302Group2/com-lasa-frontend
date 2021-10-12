import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { createUnknownError } from "../redux/actions/error";
import { newUserInfo } from "../redux/actions/user";
import cookieTools from "./cookieTools";

function SignOutRoute() {
    const dispatch = useDispatch();
    const history = useHistory()
    useEffect(() => {
        (function processSignOut() {
            let counter = 1;
            while (cookieTools.getAccessToken()) {
                cookieTools.removeAccessToken();
                console.log(counter++);
                if (counter > 100) {
                    counter = -1;
                    break;
                }
            }
            dispatch(newUserInfo());
            if (counter === -1) {
                history.push(createUnknownError("Cannot sign out"));
            }
        })();
    }, [dispatch, history]);

    return <Redirect to="/auth" />
}

export default SignOutRoute;