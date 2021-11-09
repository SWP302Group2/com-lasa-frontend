function Question({ question, index, changeContentCallBack, removeQuestionCallBack }) {

    function handleChangeContent(event) {
        changeContentCallBack(event, index, question);
    }

    function handleRemoveQuestion(event) {
        removeQuestionCallBack(event, index);
    }

    function handleMinimalContentOnClick() {
        toggleTextArea();
        document.querySelector(`.box__question--${index} .question-expand`).classList.toggle("rotate-180");
    }

    function handleExpandIconOnClick(event) {
        toggleTextArea();
        event.target?.classList.toggle("rotate-180");
    }

    function toggleTextArea() {
        const textArea = document.querySelector(`.box__question__content--${index}`);
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

    return (
        <div className={`box__question box__question--${index}`}>
            <div className="box__question__headline">
                <div className="box__question__cn">{index + 1}.</div>
                <div
                    className="box__question__minimal-content"
                    onClick={handleMinimalContentOnClick}
                >
                    Content: {question.content}
                </div>
                <i
                    title="Remove question"
                    className="material-icons question-remove"
                    onClick={handleRemoveQuestion}
                >
                    remove
                </i>

                <i
                    className="material-icons question-expand"
                    onClick={handleExpandIconOnClick}
                >
                    expand_more
                </i>
            </div>
            <textarea
                className={`box__question__content box__question__content--${index}`}
                cols="30" rows="10"
                onChange={handleChangeContent}
                value={question.content}
            />

        </div>
    );
}

export default Question;