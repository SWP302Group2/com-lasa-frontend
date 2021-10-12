import Logo from "./Logo";
import Menu from "./Menu";
import Notification from "./Notification";
import UserInfo from "./UserInfo";
import "../assets/css/header.css";
import { useEffect } from "react";
import React from "react";

function Header({ isSignIn }) {

    useEffect(() => {
        //Initialization
        const bugger = document.querySelector(".header .menu .menu__burger");
        const nav = document.querySelector(".header .menu .menu__nav");
        const navItem = document.querySelectorAll(".header .menu .menu__nav .menu__navItem");

        const notiIcon = document.querySelector(".header .notification .notification__icon");
        const notiList = document.querySelector(".header .notification .notification__list");

        const userIcon = document.querySelector(".header .userinfo .userinfo__icon");
        const userWrapper = document.querySelector(".header .userinfo .userinfo__wrapper");

        const hiddenList = document.querySelectorAll(".hidden");
        const content = document.querySelector(".content");

        //START
        (() => {
            checkWindowSize();
            window.addEventListener("resize", checkWindowSize);
            document.addEventListener("click", handleDomClickEvent);
            if (notiIcon) {
                notiIcon.addEventListener("click", handleNotiClickEvent);
                notiList.style.animation = "header-noti-list-fadein 400ms ease-in";
            }
            if (userIcon) {
                userIcon.addEventListener("click", handleUserInfoClickEvent);
                userWrapper.style.animation = "header-userinfo-wrapper-fadein 400ms ease-in";
            }
        })();
        function checkWindowSize() {
            window.innerWidth < 768 ? addEventForBurger() : clearBurger();
        }

        function addEventForBurger() {
            bugger.addEventListener("click", handleBurgerClickEvent)
        }

        function clearBurger() {
            bugger.removeEventListener("click", handleBurgerClickEvent);
            closeBurger();
        }

        function handleBurgerClickEvent() {
            closeNotification();
            closeUserInfo();

            bugger.classList.toggle("toggle");
            nav.classList.toggle("active");
            content.classList.toggle("hide-content");
            navItem.forEach(handleNavItemAnimation)
        }

        function closeNotification() {
            notiList?.classList.remove("active");
        }

        function closeUserInfo() {
            userWrapper?.classList.remove("active");
        }

        function closeBurger() {
            bugger.classList.remove("toggle");
            nav.classList.remove("active");
            content.classList.remove("hide-content");
            navItem.forEach((item) => {
                item.style.animation = "";
            })
        }

        function handleDomClickEvent(event) {
            if (hiddenList && hiddenList.length !== 0)
                isClickOnHiddenElm(event.target) || closeAllHidden();
        }

        function isClickOnHiddenElm(target) {
            return [...hiddenList].some(elm => elm.contains(target))
        }

        function closeAllHidden() {
            closeBurger();
            closeNotification();
            closeUserInfo();
        }

        function handleNotiClickEvent() {
            closeBurger();
            closeUserInfo();
            notiList.classList.toggle("active");
            notiList.scrollTop = 0;
        }

        function handleUserInfoClickEvent() {
            closeBurger();
            closeNotification();
            userWrapper.classList.toggle("active");
        }

        function handleNavItemAnimation(item, index) {
            if (item.style.animation) {
                item.style.animation = "";
                return;
            }
            item.style.animation =
                `header-menu-navItem-fadein 400ms ease-in forwards ${index / 10 + 0.2}s`;
        }

        return () => {
            bugger?.removeEventListener("click", handleBurgerClickEvent);
            document?.removeEventListener("click", handleDomClickEvent);
            window?.removeEventListener("resize", checkWindowSize);
            userIcon?.removeEventListener("click", handleUserInfoClickEvent);
            notiIcon?.removeEventListener("click", handleNotiClickEvent);
        }
    }, [isSignIn])

    return (
        <header className="header">
            <Logo />
            <Menu />
            {isSignIn ?
                <React.Fragment>
                    <Notification />
                    <UserInfo />
                </React.Fragment>
                :
                <a className="sign-in" href="/auth/sign-in">
                    <p className="sign-in__text">Sign in</p>
                </a>
            }
        </header >
    );
}

export default Header;