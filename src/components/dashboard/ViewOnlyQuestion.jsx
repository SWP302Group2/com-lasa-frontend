import { MdExpandMore } from "react-icons/md";

function ViewOnlyQuestion({ question, id, index }) {

    function handleMinimalContentOnClick() {
        toggleTextArea();
        document.querySelector(`.box__question--${id} .question-expand`).classList.toggle("rotate-180");
    }

    function handleExpandIconOnClick(event) {
        toggleTextArea();
        event.target?.classList.toggle("rotate-180");
    }

    function toggleTextArea() {
        const textArea = document.querySelector(`.box__question__content--${id}`);
        if (textArea.classList.contains("active-question-textarea")) {
            textArea.classList.remove("active-question-textarea");
            return;
        }
        closeTextArea();
        textArea.classList.add("active-question-textarea");
        textArea.focus();
    }

    function closeTextArea() {
        const textAreas = document.querySelectorAll(".search-content .create-booking-request-box textarea");
        [...textAreas].forEach(item => item.classList.remove("active-question-textarea"));
    }

    return (<div className={`box__question box__question--${id}`}>
        <div className="box__question__headline">
            <div className="box__question__cn">{index + 1}.</div>
            <div
                className="box__question__minimal-content"
                onClick={handleMinimalContentOnClick}
            >
                Content: {question.content}
            </div>

            <MdExpandMore
                className="question-expand"
                onClick={handleExpandIconOnClick}
            />
        </div>
        <textarea
            className={`box__question__content box__question__content--${id}`}
            cols="30" rows="10"
            disabled
            value={question.content}
        />
    </div>);
}

export default ViewOnlyQuestion;