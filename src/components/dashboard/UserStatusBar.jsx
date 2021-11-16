import { AiFillCheckCircle, AiOutlineStop } from "react-icons/ai";
import { RiErrorWarningFill } from "react-icons/ri";
import {
    USER_STATUS_ACTIVE,
    USER_STATUS_BANNED,
    USER_STATUS_INACTIVE
} from "../../utils/constant";

function UserStatusBar({ status }) {

    return (
        <div className="status-bar">
            {status != null && status === USER_STATUS_ACTIVE &&
                <>
                    <AiFillCheckCircle
                        className="status-bar__icon status-bar__icon--active"
                    />
                    <p className="status-bar__content">
                        Active
                    </p>
                </>
            }
            {status != null && status === USER_STATUS_BANNED &&
                <>
                    <AiOutlineStop
                        className="status-bar__icon status-bar__icon--banned"
                    />
                    <p className="status-bar__content">
                        Banned
                    </p>
                </>
            }
            {status != null && status === USER_STATUS_INACTIVE &&
                <>
                    <RiErrorWarningFill
                        className="status-bar__icon status-bar__icon--inactive"
                    />
                    <p className="status-bar__content">
                        Inactive
                    </p>
                </>
            }
        </div>
    );
}

export default UserStatusBar;