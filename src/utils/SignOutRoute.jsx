import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { createUnknownError } from "../redux/actions/error";
import { newUserInfo } from "../redux/actions/user";
import storageTools from "./storageTools";

function SignOutRoute() {
    const dispatch = useDispatch();
    const history = useHistory()
    useEffect(function processSignOut() {
        storageTools.removeAccessToken();
        if (storageTools.getAccessToken()) {
            dispatch(createUnknownError("Cannot sign out"));
        }
        dispatch(newUserInfo());
    }, [dispatch, history]);

    return <Redirect to="/auth" />
}

export default SignOutRoute;