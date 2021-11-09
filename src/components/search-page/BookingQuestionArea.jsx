import { useEffect } from "react";
import { BOOKING_REQUEST_STATUS_NOTIFIED, BOOKING_REQUEST_STATUS_READY } from "../../utils/constant";

function BookingQuestionsArea({ addQuestionCallBack, stopDefaultAction, bookingStatus, ...props }) {

    useEffect(() => {
        if (stopDefaultAction) return;

        const firstQuestion = document.querySelector(".box__question-area .box__question");
        const content = firstQuestion.querySelector(".box__question__content");
        const expandIcon = firstQuestion.querySelector(".question-expand");
        content.classList.toggle("active-question-textarea");
        expandIcon.classList.toggle("rotate-180");

        return () => {
            content.classList.remove("active-question-textarea");
            expandIcon.classList.remove("rotate-180");
        }
    }, [stopDefaultAction])

    return (
        <div className="box__question-area">
            <div className="box__title">Questions</div>
            {props.children}
            {
                bookingStatus !== BOOKING_REQUEST_STATUS_READY
                && bookingStatus !== BOOKING_REQUEST_STATUS_NOTIFIED
                && <div className="box__question-area__add-button">
                    <i
                        title="Add question"
                        className="material-icons"
                        onClick={addQuestionCallBack}
                    >
                        add
                    </i>
                </div>
            }
        </div>
    );
}

export default BookingQuestionsArea;