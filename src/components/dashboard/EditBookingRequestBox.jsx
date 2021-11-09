import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import bookingApi from "../../api/bookingApi";
import { newBookingRequest } from "../../redux/actions/booking";
import { BOOKING_REQUEST_STATUS_CANCELED, BOOKING_REQUEST_STATUS_DENIED, BOOKING_REQUEST_STATUS_FINISHED, BOOKING_REQUEST_STATUS_NOTIFIED, BOOKING_REQUEST_STATUS_READY, BOOKING_REQUEST_STATUS_WAITING } from "../../utils/constant";
import AskConfirmBox from "../AskConfirmBox";
import ErrorMessage from "../ErrorMessage";
import Loader from "../Loader";
import BookingQuestionsArea from "../search-page/BookingQuestionArea";
import BookingSelectTopic from "../search-page/BookingSelectTopic";
import Question from "../search-page/Question";
import SuccessfulMessage from "../SuccessfulMessage";

function EditBookingRequestBox({ bookingRequest, bookingStatus, closeEditCallBack, callRefresh }) {
    const [questions, setQuestions] = useState([]);
    const [oldQuestions, setoldQuestions] = useState([]);
    const [topicId, setTopicId] = useState(-1);
    const [title, setTitle] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);
    const [isCanceling, setIsCanceling] = useState(false);
    const [{ confirmStatus, action }, setConfirm] = useState({ confirmStatus: null, action: null })
    const [invalidMessages, setInvalidMessages] = useState({});
    const [successMessage, setSuccessMessage] = useState("");


    const bookingInfo = useSelector(state => state.booking)
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    function handleBookingRequestSubmit(event) {
        event.preventDefault();

        let isError = false;
        const invalidMessages = {
            invalidTitle: "",
            invalidNumberOfQuestions: "",
            invalidQuestionContent: "",
            cannotUpdate: "",
        }

        if (bookingStatus !== BOOKING_REQUEST_STATUS_WAITING
            && bookingStatus !== BOOKING_REQUEST_STATUS_CANCELED) {
            invalidMessages.cannotUpdate = "You cannot update this type of request.";
            isError = true;
        }

        if (title === "") {
            invalidMessages.invalidTitle = "Title cannot be empty";
            isError = true;
        }

        if (questions.length > 5) {
            invalidMessages.invalidNumberOfQuestions =
                "You could have only 5 questions within one request.";
            isError = true;
        } else if (questions.length < 0) {
            invalidMessages.invalidNumberOfQuestions =
                "You must have at least one question.";
            isError = true;
        }

        if (questions.find(question => !question.content)) {
            invalidMessages.invalidQuestionContent = "You should not send an empty question.";
            isError = true;
        }

        setInvalidMessages({ ...invalidMessages });

        if (isError) return;
        const updatedQuestions = [...questions].filter(question => question.id != null);
        const newQuestions = [...questions].filter(question => !question.id);
        const deletedOldQuestions = [...oldQuestions].filter(oldQuestions =>
            !questions.find(question => question.id && question.id === oldQuestions.id)
        );
        dispatch(newBookingRequest({
            title: title,
            questions: updatedQuestions,
            newQuestions,
            deletedOldQuestions,
            topicId: topicId,
            id: bookingRequest.id,
            slotId: bookingRequest.slot.id
        }));
        setIsUpdating(true);
        setConfirm({ confirmStatus: null, action: "UPDATE" })
    }

    function handleBookingRequestRemove(event) {
        closeAllError();
        let cannotRemove = "";
        if (bookingStatus === BOOKING_REQUEST_STATUS_READY
            || bookingStatus === BOOKING_REQUEST_STATUS_NOTIFIED) {
            cannotRemove = "You cannot remove it while it is ready and the meeting has not finish yet."
            setInvalidMessages({ cannotRemove });
            return;
        }

        if (bookingStatus === BOOKING_REQUEST_STATUS_WAITING) {
            cannotRemove = "You should cancel it before you can remove."
            setInvalidMessages({ cannotRemove });
            return;
        }


        dispatch(newBookingRequest({
            id: bookingRequest.id
        }));
        setIsRemoving(true);
        setConfirm({ confirmStatus: null, action: "REMOVE" })
        setInvalidMessages({ cannotRemove });
    }

    function handleBookingRequestCancel(event) {
        closeAllError()
        let cannotCancel = "";
        if (bookingStatus === BOOKING_REQUEST_STATUS_READY
            || bookingStatus === BOOKING_REQUEST_STATUS_NOTIFIED) {
            cannotCancel = "You cannot cancel it while it is ready and the meeting has not finish yet."
            setInvalidMessages({ cannotCancel });
            return;
        }

        if (bookingStatus !== BOOKING_REQUEST_STATUS_WAITING) {
            cannotCancel = "Remove?"
            setInvalidMessages({ cannotCancel });
            return;
        }

        dispatch(newBookingRequest({
            id: bookingRequest.id
        }));
        setIsCanceling(true);
        setConfirm({ confirmStatus: null, action: "CANCEL" })
        setInvalidMessages({ cannotCancel });
    }


    function handleSetConfirmStatus(result) {
        setConfirm({ confirmStatus: result, action })
    }

    function handleTitleOnChange(event) {
        closeAllError()
        if (invalidBookingStatus()) return;
        const title = (event.target.value || "");
        const invalidTitle = "";
        setInvalidMessages({ invalidTitle });
        setTitle(title);
    }

    function handleSelectTopicOnChange(event) {
        closeAllError();
        if (invalidBookingStatus()) return;
        const id = Number.parseInt(event.target.value || -1);
        if (id < 0) return;
        if (!isExistTopic(id)) return;
        setTopicId(id);
    }

    function isExistTopic(id) {
        return bookingRequest?.slot?.topics?.find(topic => topic.id === id);
    }

    function handleBookingRequestOnKeydown(event) {
        if (event.key !== "Escape") return;
        closeBookingRequest();
    }

    function closeBookingRequest() {
        const bookingRequestBox = document.querySelector(".student-dashboard .edit-box");
        bookingRequestBox.classList.remove("active-edit-booking-request-box");
        setTimeout(() => {
            if (closeEditCallBack) closeEditCallBack();
        }, 400);
    }

    function closeTextArea() {
        const textAreas = document.querySelectorAll(".student-dashboard .edit-box textarea");
        [...textAreas].forEach(item => item.classList.remove("active-question-textarea"));
    }

    function isClickOnBox(target) {
        const box = document.querySelector(".student-dashboard .edit-box .box");
        return box.contains(target);
    }

    function handleEditBoxOnClick(event) {
        if (isClickOnBox(event.target)) return;
        closeBookingRequest();
    }

    function handleChangeQuestionContent(event, index) {
        closeAllError()
        if (invalidBookingStatus()) return;
        if (!Number.isInteger(index) && index < 0) return;
        if (index >= questions.length) return;

        questions[index].content = event.target?.value;
        const message = !event.target?.value ? "You should not send an empty question." : "";
        setInvalidMessages({ invalidQuestionContent: message });
        setQuestions([...questions]);
    }

    function handleAddQuestion(event) {
        closeTextArea();
        closeAllError()
        if (invalidBookingStatus()) return;
        const invalidNumberOfQuestions = questions.length >= 5 ?
            "You could have only 5 questions within one request." : "";
        setInvalidMessages({ invalidNumberOfQuestions });

        if (questions.length >= 5) return;
        questions.push({ content: "" });
        setQuestions([...questions]);
    }

    function handleRemoveQuestion(event, index) {
        closeTextArea();
        closeAllError()
        if (invalidBookingStatus()) return;
        if (index < 0) return;

        const invalidNumberOfQuestions = questions.length <= 1 ?
            "You must have at least one question." : "";
        setInvalidMessages({ invalidNumberOfQuestions });

        if (questions.length <= 1) return;
        questions.splice(index, 1);
        setQuestions([...questions]);
    }

    function invalidBookingStatus() {
        if (bookingStatus === BOOKING_REQUEST_STATUS_WAITING) return false;
        return true;
    }

    function closeAllError() {
        setSuccessMessage(null);
        setInvalidMessages(null);
    }

    useEffect(() => {
        const bookingRequestBox = document.querySelector(".student-dashboard .edit-box");
        bookingRequestBox.classList.add("active-edit-booking-request-box");
        const titleInput = bookingRequestBox.querySelector(".box__title input");
        titleInput?.focus();

        return () => {
            bookingRequestBox.classList.remove("active-edit-booking-request-box");
        }
    }, [])

    useEffect(() => {
        setIsLoading(true);
        setInitialValue();
        callGetQuestions();

        function setInitialValue() {
            if (bookingRequest) {
                setTitle(bookingRequest.title || "");
                setTopicId(bookingRequest.topicId || -1);
            }
        }

        function callGetQuestions() {
            const onGetSuccess = (data) => {
                console.log("Get question to edit success:");
                console.log(data);

                setIsLoading(false);
                setQuestions([...data.questions]);
                setoldQuestions([...data.questions]);
            }

            const onGetFailure = (response, status, message) => {
                console.log("Get question to edit failure:");
                console.log(response);
                setIsLoading(false);
                setQuestions([]);
            }

            bookingApi.getQuestions(onGetSuccess, onGetFailure, bookingRequest.id);
        }
    }, [bookingRequest]);

    useEffect(() => {
        const box = document.querySelector(".edit-box");
        switch (bookingStatus) {
            case BOOKING_REQUEST_STATUS_WAITING:
                return;
            case BOOKING_REQUEST_STATUS_CANCELED:
            case BOOKING_REQUEST_STATUS_READY:
            case BOOKING_REQUEST_STATUS_NOTIFIED:
            case BOOKING_REQUEST_STATUS_DENIED:
            case BOOKING_REQUEST_STATUS_FINISHED:
                disableAllControlOnForm();
                return;
            default:
                return;
        }

        function disableAllControlOnForm() {
            box.querySelectorAll("input").forEach(item => item.setAttribute("readOnly", ""));
            box.querySelectorAll(".box__question__content").forEach(item => item.setAttribute("readOnly", ""));
            box.querySelectorAll("select").forEach(item => item.setAttribute("readOnly", ""));
            box.querySelectorAll("button").forEach(item => item.setAttribute("readOnly", ""));
        }

    }, [bookingStatus])

    useEffect(() => {
        if (isUpdating && confirmStatus === true && action) {
            setIsLoading(true);
            setIsUpdating(false);
            setConfirm({ confirmStatus: null, action: "" })
            callUpdateBookingRequest();
        }

        function callUpdateBookingRequest() {
            const onUpdateSuccess = (data) => {
                console.log("Update booking request success:");
                console.log(data);
                setIsLoading(false);

                setSuccessMessage("Updated");
                callRefresh(true);
            }

            const onUpdateFailure = (response, status, message) => {
                console.log("Update or remove booking request failure:");
                console.log(response);
                setIsLoading(false);

                setInvalidMessages({
                    updateBookingRequestFailed: "We have added new questions for you, but the rest is got problems. Please try again!"
                });
            }

            const onUpdateAndRemoveQuestionSuccess = (data) => {
                console.log("Update new question success:");
                console.log(data);

                bookingApi.updateBookingRequest(onUpdateSuccess, onUpdateFailure, user.id,
                    bookingInfo.id, bookingInfo.slotId, bookingInfo.title,
                    bookingInfo.topicId, bookingInfo.questions);
            }

            const onUpdateAndRemoveQuestionFailure = (response, status, message) => {
                console.log("Update new question failed:");
                console.log(response);
                setIsLoading(false);

                setInvalidMessages({
                    updateNewQuestionFailed: "Cannot add new questions or remove question on your booking, please try again!"
                });
            }

            bookingApi.updateAndRemoveQuestionsForBookingRequest(onUpdateAndRemoveQuestionSuccess, onUpdateAndRemoveQuestionFailure,
                user.id, bookingInfo.id, bookingInfo.newQuestions, bookingInfo.deletedOldQuestions);
        }

    }, [isUpdating, confirmStatus,
        action, bookingInfo, user, setSuccessMessage, callRefresh]);

    useEffect(() => {
        if (!isRemoving) return;
        if (confirmStatus !== true) return;
        if (action !== "REMOVE") return;

        setIsLoading(true);
        setIsRemoving(false);
        setConfirm({ confirmStatus: null, action: "" })
        callRemoveBookingRequest();

        function callRemoveBookingRequest() {
            const onRemoveSuccess = (data) => {
                console.log("Remove booking request success:");
                console.log(data);
                setIsLoading(false);
                setSuccessMessage("Request is removed.");
                setTimeout(() => {
                    callRefresh(true);
                    closeEditCallBack();
                }, 2000);
            }

            const onRemoveFailure = (response, status, message) => {
                console.log("Remove booking request failure:");
                console.log(response);
                setIsLoading(false);

                setInvalidMessages({
                    removeBookingRequestFailed: "Cannot request this request with unknown error. Please contact us!"
                });
            }


            bookingApi.removeBookingRequest(onRemoveSuccess, onRemoveFailure, bookingInfo.id);
        }
    }, [isRemoving, confirmStatus, action, bookingInfo, callRefresh, closeEditCallBack])

    useEffect(() => {
        if (!isCanceling) return;
        if (confirmStatus !== true) return;
        if (action !== "CANCEL") return;

        setIsLoading(true);
        setIsCanceling(false);
        setConfirm({ confirmStatus: null, action: "" })
        callCancelBookingRequest();

        function callCancelBookingRequest() {
            const onCancelSuccess = (data) => {
                console.log("Cancel booking request success:");
                console.log(data);
                setIsLoading(false);
                setSuccessMessage("Cancel request success.");
                setTimeout(() => {
                    callRefresh(true);
                    closeEditCallBack();
                }, 2000);
            }

            const onCancelFailure = (response, status, message) => {
                console.log("Cancel booking request failure:");
                console.log(response);
                setIsLoading(false);
                setInvalidMessages({
                    updateBookingRequestFailed: "Cannot request this request with unknown error. Please contact us!"
                });
            }

            bookingApi.cancelBookingRequest(onCancelSuccess, onCancelFailure, user.id, bookingInfo.id);
        }
    }, [isCanceling, confirmStatus, action, user, bookingInfo, callRefresh, closeEditCallBack])


    return (
        <div
            className="edit-box"
            onClick={handleEditBoxOnClick}
            onKeyDown={handleBookingRequestOnKeydown}
        >
            <form
                className="box"
                onSubmit={handleBookingRequestSubmit}
            >
                <h1 className="box__headline">
                    <i className="material-icons book">
                        forward_to_inbox
                    </i>
                    <p>Booking</p>
                    <i
                        className="material-icons close"
                        onClick={closeBookingRequest}
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
                        <input type="text" disabled value={bookingRequest.slot?.lecturer?.name} />
                    </div>
                    <div className="box__title">
                        <p className="box__title">Title</p>
                        <div className="box__control">
                            <input
                                type="text"
                                placeholder="Keep it short..."
                                onChange={handleTitleOnChange}
                                value={title}
                            />
                        </div>
                    </div>
                    {invalidMessages?.invalidTitle && <ErrorMessage message={invalidMessages?.invalidTitle} />}
                    <BookingSelectTopic
                        topicId={topicId}
                        topics={bookingRequest.slot?.topics}
                        callBack={handleSelectTopicOnChange}
                    />
                    <BookingQuestionsArea
                        addQuestionCallBack={handleAddQuestion}
                        stopDefaultAction={true}
                        bookingStatus={bookingStatus}
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
                        {invalidMessages?.invalidNumberOfQuestions &&
                            <ErrorMessage message={invalidMessages?.invalidNumberOfQuestions} />
                        }
                        {invalidMessages?.invalidQuestionContent &&
                            <ErrorMessage message={invalidMessages?.invalidQuestionContent} />
                        }
                    </BookingQuestionsArea>
                </div>
                {invalidMessages?.cannotUpdate &&
                    <ErrorMessage message={invalidMessages?.cannotUpdate} />
                }
                {invalidMessages?.cannotRemove &&
                    <ErrorMessage message={invalidMessages?.cannotRemove} />
                }
                {invalidMessages?.updateNewQuestionFailed &&
                    <ErrorMessage message={invalidMessages?.updateNewQuestionFailed} />
                }
                {successMessage &&
                    <SuccessfulMessage
                        message={successMessage}
                    />
                }
                <div className="box__bottom">
                    {
                        bookingStatus === BOOKING_REQUEST_STATUS_WAITING
                        &&
                        <button
                            className="box__bottom__button box__bottom__button--update"
                            type="submit"
                        >
                            Update
                        </button>
                    }
                    {(
                        bookingStatus === BOOKING_REQUEST_STATUS_CANCELED
                        || bookingStatus === BOOKING_REQUEST_STATUS_FINISHED
                        || bookingStatus === BOOKING_REQUEST_STATUS_DENIED
                    ) &&
                        <div
                            tabIndex="0"
                            className="box__bottom__button box__bottom__button--remove"
                            onClick={handleBookingRequestRemove}
                        >
                            Remove
                        </div>
                    }
                    {
                        bookingStatus === BOOKING_REQUEST_STATUS_WAITING
                        &&
                        <div
                            tabIndex="0"
                            className="box__bottom__button box__bottom__button--cancel"
                            onClick={handleBookingRequestCancel}
                        >
                            Cancel Request
                        </div>
                    }
                </div>
                {(bookingStatus === BOOKING_REQUEST_STATUS_READY
                    || bookingStatus === BOOKING_REQUEST_STATUS_NOTIFIED)
                    && <p className="box__bottom-message">
                        READ ONLY
                    </p>

                }
                {isLoading && <Loader />}
                {isUpdating && confirmStatus === null && action === "UPDATE" &&
                    <AskConfirmBox
                        message={"Do you want to update?"}
                        setSelectedResult={handleSetConfirmStatus}
                    />
                }
                {isRemoving && confirmStatus === null && action === "REMOVE" &&
                    <AskConfirmBox
                        message={"Do you want to remove this request?"}
                        setSelectedResult={handleSetConfirmStatus}
                    />
                }
                {isCanceling && confirmStatus === null && action === "CANCEL" &&
                    <AskConfirmBox
                        message={"Do you want to cancel this request?"}
                        setSelectedResult={handleSetConfirmStatus}
                    />
                }
            </form>
        </div>
    );
}

export default EditBookingRequestBox;