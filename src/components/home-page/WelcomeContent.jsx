import { useEffect } from "react";
import "../../assets/css/welcomeContent.css";
import { sliderContent } from "../../data/sliderContent";
import Slide from "./Slide";

function WelcomeContent({ setIsCheckedAuth }) {

    useEffect(checkAuthentication, [setIsCheckedAuth])
    useEffect(applyPageTitleAndActiveNavLink, [])
    useEffect(enableSliderShow, []);

    function checkAuthentication() {
        setIsCheckedAuth(false);
    }

    function applyPageTitleAndActiveNavLink() {
        const welcomeNavLink = document.querySelector(".navLink-home");
        welcomeNavLink.classList.add("active-navItem");

        return () => {
            welcomeNavLink.classList.remove("active-navItem");
        }
    }

    function enableSliderShow() {

    }

    return (
        <div className="welcome-content root-content">
            <div className="welcome-content__slider-container">
                {[...sliderContent].map((slide, index) =>
                    <Slide slide={slide} />
                )}
            </div>

            <div className="slider__change-slide-button">
                <div className="prev" >&#10094;</div>
                <div className="next" >&#10095;</div>
            </div>

            <div className="slider__dots">
                <span className="dot" ></span>
                <span className="dot" ></span>
                <span className="dot" ></span>
            </div>
        </div>

    );
}

export default WelcomeContent;