/*import React, { useEffect } from "react";
import Grid from "../../custome-library/Grid";
import Row from "../../custome-library/Row";
import Column from "../../custome-library/Column";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Content from "./Content";
import "./Home.css";
import { useHistory } from "react-router";
import Cookies from "universal-cookie/es6";
import axiosInstance from "../../utils/axiosConfig";

function HomePage() {
  const history = useHistory();

  (function doBeforeAmount() {
    const api = "/las/api/v1/home/information";
    const cookie = new Cookies();
    const tokenValue = cookie.get("access_token");
    const options = {
      withCredentials: true,
      headers: {
        Authorization: tokenValue,
      }
    };

    console.log("header token" + tokenValue);

    axiosInstance
      .get(api, options)
      .then(response => console.log(response.data))
      .then(userInfo => saveUserInfo(userInfo))
      .catch(error => {
        console.log(error);
        history.push("/sign-in");
      });
  })();

  function saveUserInfo(userInfo) {
    console.log("user info: " + userInfo);
  }

  useEffect(() => {
    const MOUSE_LEFT_CODE = 1;
    var MAPPING_HIDDEN = [];

    document.title = "Home - Lecturer Appoinment Schedule";
    document.body.style.background = "hsl(218, 21%, 90%)";

    handleHidden();
    document.addEventListener("click", processClickEvent);
    window.addEventListener("resize", handleHidden);

    function processClickEvent(event) {
      if (!clickIsLeftMouse(event)) {
        return;
      }
      if (!isOnHiddenElement(event.target)) {
        closeAllHiddenElement();
        closeOverlay();
      }
      if (isClickOnRepresentElement(event.target)) {
        processDisplayMappingHiddenWithTarget(event.target);
      }
    }

    function clickIsLeftMouse(event) {
      return event.which === MOUSE_LEFT_CODE
    }

    function handleHidden() {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        MAPPING_HIDDEN = [];
        return;
      }
      MAPPING_HIDDEN = [
        [".navbar__left__menu", ".sidebar", "sidebarDisappear"]
      ];
    }

    function isOnHiddenElement(target) {
      if (!target) {
        return false;
      }
      const hiddenList = document.getElementsByClassName("hidden");
      for (let hidden of hiddenList) {
        if (hidden.contains(target)) {
          return true;
        }
      }
      return false;
    }

    function isClickOnRepresentElement(target) {
      const representList = document.getElementsByClassName("representfor-hidden");
      for (let represent of representList) {
        if (represent.contains(target)) {
          return true;
        }
      }
      return false;
    }

    function processDisplayMappingHiddenWithTarget(target) {
      let hiddenElement = null;
      for (let info of MAPPING_HIDDEN) {
        const representElement = document.querySelector(info[0]);
        if (representElement.contains(target)) {
          hiddenElement = document.querySelector(info[1]);
          break;
        }
      }

      if (hiddenElement == null) {
        return;
      }

      if (isHidden(hiddenElement)) {
        closeAllHiddenElement();
        displayFlex(hiddenElement);
        showOverlay();
        return;
      }
    }

    function isHidden(target) {
      if (!target) {
        return true;
      }
      if (window.getComputedStyle(target, null).display === "none") {
        return true;
      }
      if (window.getComputedStyle(target, null).visibility === "hidden") {
        return true;
      }
      if (window.getComputedStyle(target, null).opacity === 0) {
        return true;
      }
      return false;
    }

    function closeOverlay() {
      const overlay = document.querySelector(".overlay");
      displayNone(overlay);
    }

    function showOverlay() {
      const overlay = document.querySelector(".overlay");
      displayFlex(overlay);
    }

    function closeAllHiddenElement() {
      for (let info of MAPPING_HIDDEN) {
        let hiddenElement = document.querySelector(info[1]);
        if (!isHidden(hiddenElement)) {
          hiddenElement.style.animation = `${info[2]} 400ms`;
          setTimeout(() => {
            let hiddenElement = document.querySelector(info[1]);
            hiddenElement.style.animation = null;
            displayNone(hiddenElement);
          }, 350);
        }
      }
    }

    function displayFlex(target) {
      if (target) {
        target.style.display = "flex";
      }
    }

    function displayNone(target) {
      if (target) {
        target.style.display = null;
      }
    }

    return (() => {
      document.removeEventListener("click", processClickEvent);
      window.removeEventListener("resize", handleHidden);
      document.body.style = null
    })
  }, []);

  const rowClasslist = ["no-gutters", "container"];
  const navbarClasslist = ["mobile-12"]
  const contentClassList = ["pc-10", "pc-offset-1", "mobile-12"];

  return (
    <Grid id="home-page">
      <Row classList={rowClasslist}>
        <div className="overlay"></div>
        <Column classList={navbarClasslist}>
          <Navbar></Navbar>
        </Column >
        <Sidebar></Sidebar>
        <Column classList={contentClassList}>
          <Content></Content>
        </Column>
      </Row>
    </Grid>
  );
}

export default HomePage;
*/