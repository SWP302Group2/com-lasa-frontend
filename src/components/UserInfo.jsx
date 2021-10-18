import { useSelector } from "react-redux";
import { DEFAULT_AVATAR_URL } from "../utils/constant";

function UserInfo({ closeBurger, closeNotification }) {
    const user = useSelector(state => state.user);

    function handleUserInfoOnClick() {
        closeBurger();
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
                    <a className="userinfo__link" href="/home">
                        <i className="userinfo__link__icon material-icons">portrait</i>
                        <p className="userinfo__link__text">Profile</p>
                    </a>
                    <a className="userinfo__link" href="/home">
                        <i className="userinfo__link__icon material-icons">settings</i>
                        <p className="userinfo__link__text">Settings</p>
                    </a>
                </div>
                <div className="userinfo__menu" >
                    <a className="userinfo__link" href="/home">
                        <i className="userinfo__link__icon material-icons">contact_support</i>
                        <p className="userinfo__link__text">Support</p>
                    </a>
                    <a className="userinfo__link" href="/sign-out">
                        <i className="userinfo__link__icon material-icons">logout</i>
                        <p className="userinfo__link__text">Sign out</p>
                    </a>
                </div>
            </div>
        </section >
    );
}

export default UserInfo;