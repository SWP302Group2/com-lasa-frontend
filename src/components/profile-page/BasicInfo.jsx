import { useSelector } from "react-redux";
import { LECTURER_ROLE, STUDENT_ROLE } from "../../utils/constant";
import UserInfoAvatarUrl from "./UserInfoAvatarUrl";
import UserInfoBirthday from "./UserInfoBirthday";
import UserInfoGender from "./UserInfoGender";
import UserInfoMajor from "./UserInfoMajor";
import UserInfoMeetingUrl from "./UserInfoMeetingUrl";
import UserInfoMSSV from "./UserInfoMSSV";
import UserInfoName from "./UserInfoName";

function BasicInfo() {
    const userInfo = useSelector(state => state.user)

    return (
        <div className="basic-info">
            <div className="basic-info__header">
                <div className="contact-info__header__title">Basic Info</div>
            </div>
            <div className="basic-info__content">
                <UserInfoName />
                <UserInfoAvatarUrl />
                <UserInfoGender />
                <UserInfoBirthday />
                {userInfo.role === STUDENT_ROLE &&
                    <>
                        <UserInfoMSSV />
                        <UserInfoMajor />
                    </>
                }
                {userInfo.role === LECTURER_ROLE &&
                    <UserInfoMeetingUrl />
                }
            </div>
        </div>
    );
}

export default BasicInfo;