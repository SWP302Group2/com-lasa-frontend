import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import bookingApi from "../../api/bookingApi";
import "../../assets/css/createBookingRequestBox.css";
import { newBookingRequest, updateInvalidMessageToBookingRequest } from "../../redux/actions/booking";
import dateTools from "../../utils/dateTools";
import ErrorMessage from "../ErrorMessage";
import SuccessfulMessage from "../SuccessfulMessage";
import BookingInputTitle from "./BookingInputTitle";
import BookingQuestionsArea from "./BookingQuestionArea";
import BookingSelectTopic from "./BookingSelectTopic";
import Question from "./Question";

function CreateBookingRequestBox({ setIsStartToBooking }) {
    const [questions, setQuestions] = useState([{ content: "" }]);
    const [topicId, setTopicId] = useState(-1);
    const [title, setTitle] = useState("");
    const [{ status, message }, setCreateBookingResult] = useState({ status: null, message: null });

    const bookingInfo = useSelector(state => state.booking);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    function handleTitleOnChange(event) {
        setTitle(event.target.value || "");
        dispatch(updateInvalidMessageToBookingRequest({
            titleMustHave: ""
        }));
    }

    function handleBookingRequestSubmit(event) {
        event.preventDefault();
        closeTextArea();
        let exceedNumberOfQuestions = "";
        let titleMustHave = "";
        let topicMustSelect = "";
        let isError = false;

        if (questions.length >= 5) {
            isError = true;
            exceedNumberOfQuestions = "You could have only 5 questions within one request."
        }
        if (questions.length < 1) {
            isError = true;
            exceedNumberOfQuestions = "You must have at least one question."
        }
        questions.find(question => {
            if (!question.content || question.content.trim() === "") {
                exceedNumberOfQuestions = "Your questions cannot be empty."
                isError = true;
                return true;
            }
            return false;
        })
        if (!title) {
            isError = true;
            titleMustHave = "Title is required."
        }
        if (topicId && topicId < 0) {
            isError = true;
            topicMustSelect = "You must select one topic"
        }
        if (isError) {
            dispatch(updateInvalidMessageToBookingRequest({
                exceedNumberOfQuestions,
                titleMustHave,
                topicMustSelect
            }))
            return;
        }

        callCreateBookingRequest();
    }

    function callCreateBookingRequest() {
        const onCreateSuccess = (data) => {
            console.log("create success");
            console.log(data);

            setCreateBookingResult({
                status: true,
                message: "Done."
            })

            disableAllControlOnForm();
        }

        const onCreateFailure = (response, status, message) => {
            console.log("Create fail");
            console.log(response);
            setCreateBookingResult({
                status: true,
                message: "Send request fail."
            })
        }

        const createTime = dateTools.getISODatetimeOfNow();
        console.log("Create time");
        console.log(createTime);
        bookingApi.createBooking(onCreateSuccess, onCreateFailure,
            user.id, createTime, bookingInfo.slot.id, topicId, questions, title
        );
    }

    function disableAllControlOnForm() {
        const form = document.querySelector(".create-booking-request-box .box");
        form.querySelectorAll("input").forEach(item => item.disabled = true);
        form.querySelectorAll("textarea").forEach(item => item.disabled = true);
        form.querySelectorAll("select").forEach(item => item.disabled = true);
        form.querySelectorAll("button").forEach(item => item.disabled = true);
    }

    function handleSelectTopicOnChange(event) {
        const id = Number.parseInt(event.target.value || -1);
        if (id < 0) return;

        setTopicId(id);
        dispatch(updateInvalidMessageToBookingRequest({
            topicMustSelect: ""
        }))
    }

    function handleBookingRequestOnKeydown(event) {
        if (event.key !== "Escape") return;
        clearBookingRequest();
    }

    function clearBookingRequest() {
        const bookingRequestBox = document.querySelector(".search-content .create-booking-request-box");
        bookingRequestBox.classList.remove("active-create-booking-request-box");
        setTimeout(() => {
            setIsStartToBooking(false);
            dispatch(newBookingRequest());
        }, 400);
    }

    function closeTextArea() {
        const textAreas = document.querySelectorAll(".search-content .create-booking-request-box textarea");
        [...textAreas].forEach(item => item.classList.remove("active-question-textarea"));
    }

    function isClickOnBooking(target) {
        const box = document.querySelector(".search-content .create-booking-request-box .box");
        return box.contains(target);
    }

    function handleBookingRequestOnClick(event) {
        if (isClickOnBooking(event.target)) return;
        clearBookingRequest();
    }

    function handleChangeQuestionContent(event, index) {
        if (!index && index < 0) return;
        dispatch(updateInvalidMessageToBookingRequest({
            exceedNumberOfQuestions: "",
        }))

        const newQuestions = [...questions] || [];
        if (index >= newQuestions.length) return;

        newQuestions[index].content = event.target?.value;
        setQuestions(newQuestions);
    }

    function handleAddQuestion(event) {
        closeTextArea();
        if (questions.length >= 5) {
            const message = "You could have only 5 questions within one request."
            dispatch(updateInvalidMessageToBookingRequest({
                exceedNumberOfQuestions: message,
            }))
            return;
        }

        dispatch(updateInvalidMessageToBookingRequest({
            exceedNumberOfQuestions: "",
        }))
        questions.push({ content: "" });
        setQuestions(questions);
    }

    function handleRemoveQuestion(event, index) {
        closeTextArea();
        if (index < 0) return;
        if (questions.length <= 1) {
            const message = "You must have at least one question."
            dispatch(updateInvalidMessageToBookingRequest({
                exceedNumberOfQuestions: message,
            }))
            return;
        }

        dispatch(updateInvalidMessageToBookingRequest({
            exceedNumberOfQuestions: "",
        }))
        questions.splice(index, 1);
        setQuestions(questions);
    }

    useEffect(() => {
        const bookingRequestBox = document.querySelector(".search-content .create-booking-request-box");
        bookingRequestBox.classList.add("active-create-booking-request-box");
        const titleInput = bookingRequestBox.querySelector(".box__title input");
        titleInput?.focus();

        return () => {
            bookingRequestBox.classList.remove("active-create-booking-request-box");
        }
    }, [])

    return (
        <div
            tabIndex="0"
            className="create-booking-request-box"
            onKeyDown={handleBookingRequestOnKeydown}
            onClick={handleBookingRequestOnClick}
        >
            <form
                className="box"
                onSubmit={handleBookingRequestSubmit}
            >
                <h1 className="box__headline">
                    <i className="material-icons book">
                        forward_to_inbox
                    </i>
                    Booking
                    <i
                        className="material-icons close"
                        onClick={clearBookingRequest}
                    >
                        close
                    </i>
                </h1>
                <div className="box__content">
                    <div className="box__from">
                        <p>From</p>
                        <input type="text" disabled value={user.name} />
                    </div>
                    <div className="box__to">
                        <p>To</p>
                        <input type="text" disabled value={bookingInfo.slot?.lecturer?.name} />
                    </div>
                    <BookingInputTitle
                        title={title}
                        callBack={handleTitleOnChange}
                    >
                    </BookingInputTitle>
                    {bookingInfo.titleMustHave && <ErrorMessage message={bookingInfo.titleMustHave} />}
                    <BookingSelectTopic
                        topicId={topicId}
                        topics={bookingInfo.slot.topics}
                        callBack={handleSelectTopicOnChange}
                    >
                        {bookingInfo.topicMustSelect &&
                            <ErrorMessage message={bookingInfo.topicMustSelect} />
                        }
                    </BookingSelectTopic>

                    <BookingQuestionsArea
                        addQuestionCallBack={handleAddQuestion}
                    >
                        {questions && [...questions].map((question, index) =>
                            <Question
                                key={"question_" + index}
                                question={question}
                                index={index}
                                changeContentCallBack={handleChangeQuestionContent}
                                removeQuestionCallBack={handleRemoveQuestion}
                            />
                        )}
                        {bookingInfo.exceedNumberOfQuestions &&
                            <ErrorMessage message={bookingInfo.exceedNumberOfQuestions} />
                        }
                    </BookingQuestionsArea>
                </div>
                <div className="box__bottom">
                    {status === true && <SuccessfulMessage message={message} />}
                    {status === false && <ErrorMessage message={message} />}
                    <button type="submit">Send request</button>
                </div>
            </form>
        </div>
    );
}

export default CreateBookingRequestBox;