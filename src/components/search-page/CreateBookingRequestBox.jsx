import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import bookingApi from "../../api/bookingApi";
import "../../assets/css/createBookingRequestBox.css";
import { newBookingRequest, updateInvalidMessageToBookingRequest } from "../../redux/actions/booking";
import dateTools from "../../utils/dateTools";
import ErrorMessage from "../ErrorMessage";
import Loader from "../Loader";
import ActionResultMessage from "./ActionResultMessage";
import BookingQuestionsArea from "./BookingQuestionArea";
import BookingSelectTopic from "./BookingSelectTopic";
import Question from "./Question";

function CreateBookingRequestBox({ setIsStartToBooking }) {
    const [questions, setQuestions] = useState([{ content: "" }]);
    const [topicId, setTopicId] = useState(-1);
    const [title, setTitle] = useState("");
    const [isLoading, setIsLoading] = useState(false);
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
            setIsLoading(false);

            setCreateBookingResult({
                status: true,
                message: "Done."
            })

            disableAllControlOnForm();
        }

        const onCreateFailure = (response, status, message) => {
            console.log("Create fail");
            console.log(response);
            setIsLoading(false);
            let errorMessage = "Send request fail."
            if (response?.data?.errors?.ValidBookingRequest === "BOOKING_REQUEST_DUPLICATED") {
                errorMessage = "You have sent a request to this slot.";
            }

            setCreateBookingResult({
                status: false,
                message: errorMessage
            })
        }

        const createTime = dateTools.getISODatetimeOfNow();
        console.log("Create time");
        console.log(createTime);
        setIsLoading(true);
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
        handleCloseBookingRequest();
    }

    function handleCloseBookingRequest() {
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

    // function isClickOnBooking(target) {
    //     const box = document.querySelector(".search-content .create-booking-request-box .box");
    //     return box.contains(target);
    // }

    // function handleBookingRequestOnClick(event) {
    //     if (isClickOnBooking(event.target)) return;
    //     handleCloseBookingRequest();
    // }

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

    useEffect(focusToFirstInput, [])

    function focusToFirstInput() {
        const bookingRequestBox = document.querySelector(".search-content .create-booking-request-box");
        bookingRequestBox.classList.add("active-create-booking-request-box");
        const titleInput = bookingRequestBox.querySelector(".box__booking-title input");
        titleInput?.focus();
        console.log(titleInput);

        return () => {
            bookingRequestBox.classList.remove("active-create-booking-request-box");
        }
    }


    function handleCloseResultMessage() {
        setCreateBookingResult({
            status: null,
            message: ""
        })
        if (status === true) {
            setIsStartToBooking(false);
        }
    }

    return (
        <div
            tabIndex="0"
            className="create-booking-request-box"
            onKeyDown={handleBookingRequestOnKeydown}
        // onClick={handleBookingRequestOnClick}
        >
            <form
                className="box"
                onSubmit={handleBookingRequestSubmit}
            >
                <div className="box__header">
                    <h2 className="box__header__title">Booking</h2>
                    <AiOutlineClose
                        className="box__header__close-icon"
                        onClick={handleCloseBookingRequest}
                    />
                </div>
                <div className="box__content">
                    <div className="box__to">
                        <p className="box__title">To</p>
                        <div className="box__control">
                            <input type="text" disabled value={bookingInfo.slot?.lecturer?.name} />
                        </div>
                    </div>
                    <div className="box__booking-title">
                        <p className="box__title">Title</p>
                        <div className="box__control">
                            <input
                                type="text"
                                placeholder="Enter title"
                                onChange={handleTitleOnChange}
                                value={title}
                            />
                        </div>
                    </div>
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
                        stopDefaultAction={true}
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
                {status != null &&
                    <ActionResultMessage
                        status={status}
                        message={message}
                        closeCallBack={handleCloseResultMessage}
                    />
                }
                <div className="box__bottom">
                    <button
                        className="box__bottom__send"
                        type="submit"
                    >
                        Send
                    </button>
                    <p
                        className="box__bottom__close"
                        tabIndex="0"
                        onClick={handleCloseBookingRequest}
                    >
                        Close
                    </p>
                </div>
                {isLoading && <Loader />}
            </form>
        </div>
    );
}

export default CreateBookingRequestBox;