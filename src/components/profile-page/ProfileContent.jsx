import { useEffect } from "react";
import { PROFILE_PAGE_TITLE } from "../../utils/constant";
import "../../assets/css/profileContent.css";
import ProfileHeader from "./ProfileHeader";
import ProfileBody from "./ProfileBody";

function ProfileContent({ setIsCheckedAuth }) {

    useEffect(checkAuthentication, [setIsCheckedAuth]);
    useEffect(displayTitleAndActiveNavLink, []);

    function checkAuthentication() {
        setIsCheckedAuth(false);
    }

    function displayTitleAndActiveNavLink() {
        document.title = PROFILE_PAGE_TITLE;
    }

    useEffect(() => {
        const header = document.querySelector(".header");
        header?.classList.add("dark-mode");

        return () => {
            header?.classList.remove("dark-mode");
        }
    }, [])

    return (
        <div className="profile-content root-content">
            <div className="profile-content__container">
                <ProfileHeader />
                <ProfileBody />
            </div>
        </div>
    );
}

export default ProfileContent;