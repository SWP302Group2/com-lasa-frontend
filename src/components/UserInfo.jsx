import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addLocation } from "../redux/actions/history";
import { DEFAULT_AVATAR_URL } from "../utils/constant";

function UserInfo({ closeBurger, closeNotification, closeUserInfo }) {
    const user = useSelector(state => state.user);

    const dispatch = useDispatch();

    function handleLinkOnClick(path) {
        dispatch(addLocation(path));
        if (closeUserInfo)
            closeUserInfo();
    }

    function handleUserInfoOnClick() {
        if (closeBurger)
            closeBurger();
        if (closeNotification)
            closeNotification();

        const userWrapper = document.querySelector(".header .userinfo__wrapper");
        userWrapper.classList.toggle("active");
    }

    return (
        <section className="userinfo hidden">
            <div
                className="userinfo__icon"
                onClick={handleUserInfoOnClick}
            >
                <i className="material-icons">account_circles</i>
            </div>
            <div className="userinfo__wrapper">
                <div className="userinfo__user">
                    <img
                        src={user?.avatarUrl || DEFAULT_AVATAR_URL}
                        alt="Your avatar"
                        height="100" width="100" />
                    <div className="userinfo__info">
                        <p className="userinfo__name">
                            {user?.name || user?.email || "noname"}
                        </p>
                    </div>
                </div>
                <div className="userinfo__menu">
                    <Link
                        className="userinfo__link"
                        to="/profile"
                        onClick={() => handleLinkOnClick("/profile")}
                    >
                        <i className="userinfo__link__icon material-icons">portrait</i>
                        <p className="userinfo__link__text">Profile</p>
                    </Link>
                    <Link
                        className="userinfo__link"
                        to="/home"
                        onClick={() => handleLinkOnClick("/home")}
                    >
                        <i className="userinfo__link__icon material-icons">settings</i>
                        <p className="userinfo__link__text">Settings</p>
                    </Link>
                </div>
                <div className="userinfo__menu" >
                    <Link
                        className="userinfo__link"
                        to="/home"
                        onClick={() => handleLinkOnClick("/home")}
                    >
                        <i className="userinfo__link__icon material-icons">contact_support</i>
                        <p className="userinfo__link__text">Support</p>
                    </Link>
                    <Link
                        className="userinfo__link"
                        to="/sign-out"
                    >
                        <i className="userinfo__link__icon material-icons">logout</i>
                        <p className="userinfo__link__text">Sign out</p>
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default UserInfo;