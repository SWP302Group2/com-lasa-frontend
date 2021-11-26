import { useSelector } from "react-redux";
import { RANDOM_AVATAR_API, RANDOM_BACKGROUND_IMG_API } from "../../utils/constant";

function ProfileHeader() {
    const userInfo = useSelector(state => state.user);

    return (
        <div className="profile-content__header">
            <div className="profile-content__header__background">
                <img src={RANDOM_BACKGROUND_IMG_API + "1024x300"} alt="background" />
            </div>
            <div className="profile-content__header__userArea">
                <div className="avatar">
                    <img
                        src={userInfo?.avatarUrl || (RANDOM_AVATAR_API + "/400")} alt="Your avatar"
                        width="150"
                        height="150"
                    />
                </div>
                <div className="name">
                    {userInfo.name || "Anonymous"}
                </div>
            </div>
        </div>
    );
}

export default ProfileHeader;