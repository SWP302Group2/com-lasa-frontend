import { useSelector } from "react-redux";
import { ADMIN_ROLE } from "../../utils/constant";
import UserInfoPassword from "./UserInfoPassword";

function SecurityInfo() {
    const userInfo = useSelector(state => state.user)

    return (
        <div className="security-info">
            <div className="security-info__header">
                <div className="security-info__header__title">Security Info</div>
            </div>
            <div className="security-info__content">
                {/* {userInfo.role === ADMIN_ROLE && */}
                    <UserInfoPassword />
                {/* } */}
            </div>
        </div>
    );
}

export default SecurityInfo;