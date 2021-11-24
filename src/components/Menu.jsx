import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addLocation } from "../redux/actions/history";

function Menu({ closeBurger, closeNotification, closeUserInfo }) {
    const dispatch = useDispatch();

    function handleBurgerOnClick(event) {
        console.log("seeee")
        closeNotification();
        closeUserInfo();
        const bugger = document.querySelector(".header .menu__burger");
        const nav = document.querySelector(".header .menu__nav");
        const navItem = document.querySelectorAll(".header .menu__navItem");
        const content = document.querySelector("#home-page .root-content");

        bugger?.classList.toggle("toggle");
        nav?.classList.toggle("active");
        content?.classList.toggle("hide-content");

        navItem?.forEach(handleNavItemAnimation)
    }

    function handleNavItemAnimation(item, index) {
        item?.classList?.toggle(".active-navItem");
        if (item.style.animation) {
            item.style.animation = "";
            return;
        }
        item.style.animation =
            `header-menu-navItem-fadein 400ms ease-in forwards ${index / 10 + 0.2}s`;
    }

    function handleLinkOnClick(path) {
        dispatch(addLocation(path));
        closeBurger();
    }

    useEffect(() => {
        window.addEventListener("resize", checkWindowSize);

        function checkWindowSize() {
            if (window.innerWidth > 768) {
                if (closeBurger) closeBurger();
            }
        }

        return () => {
            window.removeEventListener("resize", checkWindowSize);
        }
    }, [closeBurger])

    return (
        <section className="menu hidden">
            <div className="menu__burger" onClick={handleBurgerOnClick}>
                <div className="line-1"></div>
                <div className="line-2"></div>
                <div className="line-3"></div>
            </div>
            <ul className="menu__nav">
                <li className="menu__navItem navLink-home">
                    <Link
                        to="/home"
                        onClick={() => handleLinkOnClick("/home")}
                    >
                        Home
                    </Link>
                </li>
                <li className="menu__navItem navLink-search">
                    <Link
                        to="/search"
                        onClick={() => handleLinkOnClick("/search")}
                    >
                        Search
                    </Link>
                </li>
                <li className="menu__navItem navLink-dashboard">
                    <Link
                        to="/dashboard"
                        onClick={() => handleLinkOnClick("/dashboard")}
                    >
                        Dashboard
                    </Link>
                </li>
                <li className="menu__navItem">
                    <Link
                        to="/home"
                        onClick={() => handleLinkOnClick("/home")}
                    >
                        More
                        <i className="material-icons">expand_more</i>
                    </Link>
                </li>
            </ul>
        </section>
    );
}

export default Menu;