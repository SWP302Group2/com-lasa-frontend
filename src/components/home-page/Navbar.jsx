import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar__left">
                <div className="navbar__left__menu representfor-hidden" tabIndex="0">
                    <i className="navbar__icon material-icons">menu</i>
                </div>
                <Link className="logo" to="/home">
                    <svg xmlns="http://www.w3.org/2000/svg" height="4rem">
                        <g>
                            <title>Layer 1</title>
                            <text fontStyle="normal" fontWeight="bold" textAnchor="middle"
                                dominantBaseline="middle" y="65%" x="0" fontFamily="'Ephesis, sans-serif'"
                                fontSize="3rem" strokeWidth="0" stroke="#fc8b36" fill="#f2bc94">
                                LASA
                            </text>
                        </g>
                    </svg>
                </Link>
            </div>
            <div className="navbar__right">
                <div className="navbar__search representfor-hidden">
                    <i className="navbar__icon material-icons">
                        search
                    </i>
                    <input className="navbar__search__input" type="text"
                        placeholder="Search lecturer, available slots, etc" />
                </div>
                <div className="navbar__notify representfor-hidden">
                    <i className="navbar__icon material-icons">
                        notifications
                    </i>
                    <div className="navbar__notify__list hidden">
                        <div className="navbar__notify__items"></div>
                        <div className="navbar__notify__items"></div>
                        <div className="navbar__notify__items"></div>
                        <div className="navbar__notify__items"></div>
                    </div>
                </div>
                <div className="navbar__user-area representfor-hidden">
                    <img className="navbar__avatar" src="https://avatarfiles.alphacoders.com/699/69905.png"
                        alt="Your avatar" height="36" width="36" />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;