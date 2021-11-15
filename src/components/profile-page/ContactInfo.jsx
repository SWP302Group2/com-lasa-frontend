import { useSelector } from "react-redux";
import UserInfoEmail from "./UserInfoEmail";
import UserInfoPhone from "./UserInfoPhone";
import { ADMIN_ROLE } from "../../utils/constant";
import UserInfoAddress from "./UserInfoAddress";

function ContactInfo() {
    const userInfo = useSelector(state => state.user);

    return (
        <div className="contact-info info-box">
            <div className="contact-info__header">
                <div className="contact-info__header__title">Contact Info</div>
            </div>
            <div className="contact-info__body">
                <UserInfoEmail />
                <UserInfoPhone />
                {userInfo.role !== ADMIN_ROLE &&
                    <UserInfoAddress />
                }
            </div>
        </div>
    );
}

export default ContactInfo;