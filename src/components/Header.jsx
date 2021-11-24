import Logo from "./Logo";
import Menu from "./Menu";
import Notification from "./Notification";
import UserInfo from "./UserInfo";
import "../assets/css/header.css";
import { useEffect, useState } from "react";
import React from "react";
import storageTools from "../utils/storageTools";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Header() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const role = useSelector((state) => state.user.role);

  function closeBurger() {
    const bugger = document.querySelector(".header .menu__burger");
    const nav = document.querySelector(".header .menu__nav");
    const navItem = document.querySelectorAll(".header .menu__navItem");
    const content = document.querySelector("#home-page .root-content");

    bugger?.classList?.remove("toggle");
    nav?.classList?.remove("active");
    content?.classList?.remove("hide-content");
    navItem.forEach((item) => {
      if (item) {
        item?.classList.remove("active-navItem");
        item.style.animation = "";
      }
    });
  }

  function closeNotification() {
    const notiList = document.querySelector(".header .notification__list");
    notiList?.classList?.remove("active-notiList");
  }

  function closeUserInfo() {
    const userWrapper = document.querySelector(".header .userinfo__wrapper");
    userWrapper?.classList?.remove("active");
  }

  useEffect(
    function checkSignInStatus() {
      const accessToken = storageTools.getAccessToken();
      setIsSignedIn(accessToken != null && role != null);
    },
    [role]
  );

  useEffect(function handleHiddenListEvent() {
    document.addEventListener("click", handleDomClickEventForHeader);
    const hiddenList = document.querySelectorAll(".hidden");

    function handleDomClickEventForHeader(event) {
      if (hiddenList && hiddenList.length !== 0)
        isClickOnHiddenElm(event.target) || closeAllHidden();
    }

    function isClickOnHiddenElm(target) {
      return [...hiddenList].some((elm) => elm.contains(target));
    }

    function closeAllHidden() {
      closeBurger();
      closeNotification();
      closeUserInfo();
    }

    return () => {
      document?.removeEventListener("click", handleDomClickEventForHeader);
    };
  }, []);

  return (
    <header className="header">
      <div className="header__container">
        <Logo />
        <Menu
          closeBurger={closeBurger}
          closeNotification={closeNotification}
          closeUserInfo={closeUserInfo}
        />
        {isSignedIn && (
          <React.Fragment>
            <Notification
              closeBurger={closeBurger}
              closeNotification={closeNotification}
              closeUserInfo={closeUserInfo}
            />
            <UserInfo
              closeBurger={closeBurger}
              closeNotification={closeNotification}
              closeUserInfo={closeUserInfo}
            />
          </React.Fragment>
        )}

        {!isSignedIn && (
          <Link className="sign-in" to="/auth/sign-in">
            <p className="sign-in__text">Sign in</p>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
