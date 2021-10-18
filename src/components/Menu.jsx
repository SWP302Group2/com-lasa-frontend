import { useEffect } from "react";

function Menu({ closeBurger, closeNotification, closeUserInfo }) {

    function handleBurgerOnClick(event) {
        closeNotification();
        closeUserInfo();
        const bugger = event.target;
        const nav = document.querySelector(".header .menu__nav");
        const navItem = document.querySelectorAll(".header .menu__navItem");
        const content = document.querySelector("#home-page .root-content");

        bugger?.classList.toggle("toggle");
        nav?.classList.toggle("active");
        content?.classList.toggle("hide-content");
        console.log(content);
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

    function handleLinkOnClick() {
        closeBurger();
    }

    useEffect(() => {
        window.addEventListener("resize", checkWindowSize);

        function checkWindowSize() {
            if (window.innerWidth > 768) closeBurger();
        }

        return () => {

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
                    <a
                        href="/home"
                        onClick={handleLinkOnClick}
                    >
                        Home
                    </a>
                </li>
                <li className="menu__navItem navLink-search">
                    <a
                        href="/search"
                        onClick={handleLinkOnClick}
                    >
                        Search
                    </a>
                </li>
                <li className="menu__navItem">
                    <a
                        href="/home"
                        onClick={handleLinkOnClick}
                    >
                        Schedule
                    </a>
                </li>
                <li className="menu__navItem">
                    <a
                        href="/home"
                        onClick={handleLinkOnClick}
                    >
                        Dashboard
                    </a>
                </li>
                <li className="menu__navItem">
                    <a
                        href="/home"
                        onClick={handleLinkOnClick}
                    >
                        More
                        <i className="material-icons">expand_more</i>
                    </a>
                </li>
            </ul>
        </section>
    );
}

export default Menu;