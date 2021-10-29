import { useEffect } from "react";
import "../../assets/css/welcomeContent.css";
function WelcomeContent() {

    useEffect(() => {
        const welcomeNavLink = document.querySelector(".navLink-home");
        welcomeNavLink.classList.add("active-navItem");

        return () => {
            welcomeNavLink.classList.remove("active-navItem");
        }
    }, [])

    return (
        <div className="welcome-content root-content">
            <h2 className="welcome-content__headline">Welcome to</h2>
            <h2 className="welcome-content__appname">Lecturer Appointment Schedule Application</h2>
            <a className="welcome-content__button" href="/search">
                Search now...
            </a>
        </div>

    );
}

export default WelcomeContent;