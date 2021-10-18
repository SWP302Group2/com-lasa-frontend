import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProcessPosition } from "../../redux/actions/signup";
import LecturerOptional from "./LecturerOptional";
import StudentOptional from "./StudentOptional";

function OptionalInfo({ setPosition, setMoreInfoStep }) {
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.signup.userInfo);

    function handleClickBackButton() {
        setMoreInfoStep(1);
    }

    function handleClickDoneButton() {
        dispatch(updateProcessPosition(3));
        setPosition(3);
    }

    useEffect(() => {


    }, [])
    return (
        <React.Fragment>
            <div className="sign-up__step__title">
                More information
            </div>
            <div className="sign-up__optional">
                {userInfo.role === "STUDENT" ? <StudentOptional userInfo={userInfo} /> : null}
                {userInfo.role === "LECTURER" ? <LecturerOptional userInfo={userInfo} /> : null}
                <p className="sign-up__optional__note">
                    To fully use our services, you need provide some information.
                    However, you can edit it later on the settings page.
                </p>
                <div className="sign-up__optional__button">
                    <button onClick={handleClickBackButton}>
                        <i className="material-icons">
                            arrow_back
                        </i>
                    </button>
                    <button onClick={handleClickDoneButton}>
                        <i className="material-icons">
                            done
                        </i>
                    </button>
                </div>

            </div>
        </React.Fragment >
    );
}

export default OptionalInfo;