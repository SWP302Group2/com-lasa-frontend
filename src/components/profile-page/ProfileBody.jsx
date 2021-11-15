import BasicInfo from "./BasicInfo";
import ContactInfo from "./ContactInfo";
import SecurityInfo from "./SecurityInfo";

function ProfileBody() {
    return (
        <div className="profile-content__body">
            <BasicInfo />
            <ContactInfo />
            <SecurityInfo />
        </div>
    );
}

export default ProfileBody;