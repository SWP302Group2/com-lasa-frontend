import { useEffect, Suspense, useState } from "react";
import "../../assets/css/welcomeContent.css";
import { Link } from "react-router-dom";
import intro from "../../assets/svg/intro.webm";
import loop from "../../assets/svg/loop.mp4";
import CircularFont from "../../assets/images/CircularStd-Medium.otf";
import LoadingEffect from "../LoadingEffect";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addLocation } from "../../redux/actions/history";


function WelcomeContent({ setIsCheckedAuth }) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(function saveLocation() {
    dispatch(addLocation(history?.location?.pathname));
  }, [dispatch, history]);

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
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    if (video) {
      video.oncanplaythrough = () => {
        setIsLoading(false);
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

    return () => clearTimeout(timer);
  }

  return (
    <div className="welcome-content root-content">
      {isLoading && <LoadingEffect />}
      <div className="welcome-content__slider-container">
        <Suspense fallback={LoadingEffect}>
          <div className="mp4-container">
            <video className="intro">
              <source src={intro} type="video/mp4" />
            </video>
            <video className="loop" >
              <source src={loop} type="video/mp4" />
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
