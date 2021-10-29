import { useEffect } from "react";

function BookingQuestionsArea({ addQuestionCallBack, ...props }) {

    useEffect(() => {
        const firstQuestion = document.querySelector(".box__question-area .box__question");
        const content = firstQuestion.querySelector(".box__question__content");
        const expandIcon = firstQuestion.querySelector(".question-expand");
        content.classList.toggle("active-question-textarea");
        expandIcon.classList.toggle("rotate-180");

        return () => {
            content.classList.remove("active-question-textarea");
            expandIcon.classList.remove("rotate-180");
        }
    }, [])

    return (
        <div className="box__question-area">
            {props.children}
            <div className="box__question-area__add-button">
                <i
                    title="Add question"
                    className="material-icons"
                    onClick={addQuestionCallBack}
                >
                    add
                </i>
            </div>
        </div>
    );
}

export default BookingQuestionsArea;