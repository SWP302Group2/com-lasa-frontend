import { useEffect } from "react";
import "../../assets/css/welcomeContent.css";
import { Link } from "react-router-dom";

function WelcomeContent({ setIsCheckedAuth }) {
  useEffect(checkAuthentication, [setIsCheckedAuth]);
  useEffect(applyPageTitleAndActiveNavLink, []);
  useEffect(enableSliderShow, []);

  function checkAuthentication() {
    setIsCheckedAuth(false);
  }

  function applyPageTitleAndActiveNavLink() {
    const welcomeNavLink = document.querySelector(".navLink-home");
    welcomeNavLink.classList.add("active-navItem");

    return () => {
      welcomeNavLink.classList.remove("active-navItem");
    };
  }

  function enableSliderShow() {}

  return (
    <div className="welcome-content root-content">
      <div className="welcome-content__slider-container">
        <div className="slide slide-welcome">
          <div className="slide__header">Welcome to</div>
          <div className="slide__content">Lecturer Appointment</div>
          <div className="slide__content">Schedule Applications</div>
          <Link to="/search" className="slide-welcome__button">
            Get started
          </Link>
        </div>
      </div>
    </div>
  );
}

export default WelcomeContent;
