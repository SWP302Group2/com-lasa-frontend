import { useEffect, useState } from "react";
import bookingApi from "../../api/bookingApi";
import Loader from "../Loader";
import "../../assets/css/showQuestionBox.css";
import { AiOutlineClose } from "react-icons/ai";
import ViewOnlyQuestion from "./ViewOnlyQuestion";

function ShowQuestionBox({ bookingRequest, setShowQuestion }) {
    const [questions, setQuestions] = useState([])
    const [isLoading, setIsLoading] = useState(false);


    function handleCloseShowQuestionBox() {
        hideBox();

        setTimeout(() => {
            if (setShowQuestion) setShowQuestion(false);
        }, 300);

    }

    function hideBox() {
        const editBox = document.querySelector(".show-question-box");
        editBox?.classList.remove("active-show-question-box");
    }

    useEffect(activeBox, []);
    useEffect(callApiGetQuestions, [questions, bookingRequest]);

    function activeBox() {
        const editBox = document.querySelector(".show-question-box");
        editBox?.classList.add("active-show-question-box");
        editBox?.focus();

        return () => {
            editBox?.classList.remove("active-show-question-box");
        }
    }

    function callApiGetQuestions() {
        if (!bookingRequest || !bookingRequest.id) return;
        if (Array.isArray(questions) && questions.length > 0) return;
        setIsLoading(true);
        callGetQuestions();

        function callGetQuestions() {
            const onGetSuccess = (data) => {
                console.log("Lecturer get questions for view success:");
                console.log(data);
                setIsLoading(false);

                setQuestions([...data.questions]);
            }

            const onGetFailure = (response, status, message) => {
                console.log("Lecturer get questions for view failure:");
                console.log(response);
                setIsLoading(false);
                setQuestions(null);
            }

            bookingApi.getQuestions(onGetSuccess, onGetFailure, bookingRequest.id);
        }
    }

    return (
        <div className="show-question-box" tabIndex="0">
            <div className="box" tabIndex="0">
                <div className="box__header">
                    <h2 className="box__header__title">Question ({questions?.length || 0})</h2>
                    <AiOutlineClose
                        className="box__header__close-icon"
                        onClick={handleCloseShowQuestionBox}
                    />
                </div>
                <div className="box__content">
                    {questions && [...questions].map((question, index) =>
                        <ViewOnlyQuestion
                            key={"question_" + question.id}
                            question={question}
                            id={question.id}
                            index={index}
                        />
                    )}
                </div>
                <div className="box__bottom">
                    <p
                        className="box__bottom__close"
                        tabIndex="0"
                        onClick={handleCloseShowQuestionBox}
                    >
                        Close
                    </p>
                </div>
                {isLoading && <Loader />}
            </div>
        </div>
    );
}

export default ShowQuestionBox;