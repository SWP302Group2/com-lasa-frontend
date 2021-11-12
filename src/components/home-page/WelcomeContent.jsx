import { useEffect, Suspense } from "react";
import "../../assets/css/welcomeContent.css";
import { Link } from "react-router-dom";
// import intro from "../../assets/svg/intro.webm";
// import loop from "../../assets/svg/loop.mp4";
import CircularFont from "../../assets/images/CircularStd-Medium.otf";
import LoadingEffect from "../LoadingEffect";



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

  function enableSliderShow() {
    const video = document.querySelector(".intro");
    const loop = document.querySelector(".loop");
    loop?.classList.add("hide-loop");
    if (video) {
      video.oncanplaythrough = () => {
        video.muted = true;
        video.play();
        setTimeout(() => {
          if (loop) {
            loop?.classList.remove("hide-loop");
            loop.muted = true;
            loop.play();
            loop.loop = true;
          }
        }, 5800);
      };
    }
  }

  return (
    <div className="welcome-content root-content">
      <div className="welcome-content__slider-container">
        <Suspense fallback={LoadingEffect}>
          <div className="mp4-container">
            <video className="intro">
              <source src="https://useplink.com//assets/images/frontpage/intro.webm" type="video/mp4" />
            </video>
            <video className="loop" >
              <source src="https://useplink.com/assets/images/frontpage/loop.webm" type="video/mp4" />
            </video>
          </div>
        </Suspense>
        <div
          className="slide slide-welcome"
          style={{ fontFamily: CircularFont }}
        >
          <div className="slide__header">Welcome to</div>
          <div className="slide__content">Lecturer Appointment</div>
          <div className="slide__content">Schedule App</div>
          <Link to="/search" className="slide-welcome__button">
            Get started
          </Link>
        </div>
      </div>
    </div>
  );
}

export default WelcomeContent;
