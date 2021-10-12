import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateSignUpInfo } from "../../redux/actions/signup";

function DefineRole({ setPosition }) {
    const dispatch = useDispatch();

    useEffect(() => {
        //Initialize
        const studentButton = document.querySelector(".auth-page .sign-up .define-role .define-role__content .define-role__select--student");
        const lecturerButton = document.querySelector(".auth-page .sign-up .define-role .define-role__content .define-role__select--lecturer");
        //Start
        (() => {
            studentButton?.addEventListener("click", handleRoleButtonClickEvent);
            lecturerButton?.addEventListener("click", handleRoleButtonClickEvent);
        })();

        function handleRoleButtonClickEvent(event) {
            if (!event || !event.target) return;

            if (studentButton.contains(event.target)) {
                dispatch(updateSignUpInfo({
                    userInfo: {
                        role: "STUDENT"
                    },
                    processPosition: 3
                }));
                setPosition(3);
                return;
            }

            if (lecturerButton.contains(event.target)) {
                dispatch(updateSignUpInfo({
                    userInfo: { role: "LECTURER" },
                    processPosition: 3
                }));
                setPosition(3);
                return;
            }
        }

    }, [dispatch, setPosition])

    return (
        <div className="sign-up__step  define-role">
            <div className="sign-up__step__title">
                Your are..
            </div>
            <div className="define-role__content">
                <div className="define-role__select define-role__select--student">
                    I am student.
                </div>
                <div className="define-role__select define-role__select--lecturer">
                    I am lecturer.
                </div>
            </div>
        </div>
    );
}

export default DefineRole;