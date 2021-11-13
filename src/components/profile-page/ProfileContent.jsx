import { useEffect } from "react";
import { PROFILE_PAGE_TITLE } from "../../utils/constant";
import "../../assets/css/profileContent.css";

function ProfileContent({ setIsCheckedAuth }) {

    useEffect(checkAuthentication, [setIsCheckedAuth]);
    useEffect(displayTitleAndActiveNavLink, []);

    function checkAuthentication() {
        setIsCheckedAuth(false);
    }

    function displayTitleAndActiveNavLink() {
        document.title = PROFILE_PAGE_TITLE;
    }

    return (
        <div className="profile-content root-content">

        </div>
    );
}

export default ProfileContent;