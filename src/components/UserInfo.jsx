import { Link } from "react-router-dom";

function UserInfo(props) {
    return (
        <section className="userinfo hidden">
            <div className="userinfo__icon">
                <i className="material-icons">account_circles</i>
            </div>
            <div className="userinfo__wrapper">
                <div className="userinfo__user">
                    <img src={props?.avatarUrl} alt=""
                        height="100" width="100" />
                    <div className="userinfo__info">
                        <p className="userinfo__name">{props?.name}</p>
                    </div>
                </div>
                <div className="userinfo__menu">
                    <Link className="userinfo__link" to="/home">
                        <i className="userinfo__link__icon material-icons">portrait</i>
                        <p className="userinfo__link__text">Profile</p>
                    </Link>
                    <Link className="userinfo__link" to="/home">
                        <i className="userinfo__link__icon material-icons">settings</i>
                        <p className="userinfo__link__text">Settings</p>
                    </Link>
                </div>
                <div className="userinfo__menu" >
                    <Link className="userinfo__link" to="/home">
                        <i className="userinfo__link__icon material-icons">contact_support</i>
                        <p className="userinfo__link__text">Support</p>
                    </Link>
                    <Link className="userinfo__link" to="/home">
                        <i className="userinfo__link__icon material-icons">logout</i>
                        <p className="userinfo__link__text">Sign out</p>
                    </Link>
                </div>
            </div>
        </section >
    );
}

export default UserInfo;