import React from "react";
import { useDispatch } from "react-redux";
import { updateRole } from "../../redux/actions/signup";

function DefineRole({ setMoreInfoStep }) {
    const dispatch = useDispatch();


    function handleRoleButtonClickEvent(event) {
        if (!event || !event.target) return;

        const target = event.target;
        if (target.classList.contains("student")) {
            dispatch(updateRole("STUDENT"));
            setMoreInfoStep(2);
        }
        if (target.classList.contains("lecturer")) {
            dispatch(updateRole("LECTURER"));
            setMoreInfoStep(2);
        }
    }

    return (
        <React.Fragment>
            <div className="sign-up__step__title">
                You are..
            </div>
            <div className="sign-up__define-role">
                <div className="sign-up__define-role__select student" onClick={handleRoleButtonClickEvent}>
                    I am student.
                </div>
                <div className="sign-up__define-role__select lecturer" onClick={handleRoleButtonClickEvent}>
                    I am lecturer.
                </div>
            </div>
        </React.Fragment>
    );
}

export default DefineRole;