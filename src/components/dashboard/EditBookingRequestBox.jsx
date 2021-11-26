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
import "../../assets/css/editBookingRequestBox.css";
import { AiOutlineClose } from "react-icons/ai";
import ActionResultMessage from "../search-page/ActionResultMessage";

function EditBookingRequestBox({ bookingRequest, bookingStatus, closeEditCallBack, callRefresh }) {
    const [questions, setQuestions] = useState([]);
    const [topicId, setTopicId] = useState(-1);
    const [title, setTitle] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);
    const [isCanceling, setIsCanceling] = useState(false);
    const [invalidMessages, setInvalidMessages] = useState({});
    const [{ confirmStatus, action }, setConfirm] = useState({ confirmStatus: null, action: null })
    const [{ status, message }, setEditBookingResult] = useState({ status: null, message: null });


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

        const updatedQuestions = [...questions].map(question => {
            question.bookingId = bookingRequest.id;
            return question;
        });

        dispatch(newBookingRequest({
            title: title,
            questions: updatedQuestions,
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
        handleCloseBookingRequest();
    }

    function handleCloseBookingRequest() {
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

    useEffect(callUpdateBookingRequest, [isUpdating, confirmStatus, action, bookingInfo, user, callRefresh]);

    useEffect(callRemoveBookingRequest, [isRemoving, confirmStatus, action, bookingInfo, callRefresh, closeEditCallBack])

    useEffect(callCancelBookingRequest, [isCanceling, confirmStatus, action, user, bookingInfo, callRefresh, closeEditCallBack])

    function callUpdateBookingRequest() {
        if (!isUpdating) return;
        if (confirmStatus !== true) return;
        if (action !== "UPDATE") return;

        setIsLoading(true);
        setIsUpdating(false);
        setConfirm({ confirmStatus: null, action: "" })
        callUpdateBookingRequest();

        function callUpdateBookingRequest() {
            const onUpdateSuccess = (data) => {
                console.log("Update booking request success:");
                console.log(data);
                setIsLoading(false);

                setEditBookingResult({
                    status: true,
                    message: "Updated"
                });
            }

            const onUpdateFailure = (response, status, message) => {
                console.log("Update or remove booking request failure:");
                console.log(response);
                setIsLoading(false);

                setEditBookingResult({
                    status: false,
                    message: "Update failed with unknown error. Please try again! DEV:BK"
                });
            }

            bookingApi.updateBookingRequest(onUpdateSuccess, onUpdateFailure, user.id, bookingInfo);
        }
    }

    function callRemoveBookingRequest() {
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

                setEditBookingResult({
                    status: true,
                    message: "Removed"
                });
            }

            const onRemoveFailure = (response, status, message) => {
                console.log("Remove booking request failure:");
                console.log(response);
                setIsLoading(false);

                setEditBookingResult({
                    status: true,
                    message: "Unknown error, cannot remove the request. Please contact us!"
                });
            }
            bookingApi.removeBookingRequest(onRemoveSuccess, onRemoveFailure, bookingInfo.id);
        }

    }

    function callCancelBookingRequest() {
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
                setEditBookingResult({
                    status: true,
                    message: "Canceled"
                });
            }

            const onCancelFailure = (response, status, message) => {
                console.log("Cancel booking request failure:");
                console.log(response);
                setIsLoading(false);

                setEditBookingResult({
                    status: false,
                    message: "Unknown error, cannot cancel the request. Please contact us!"
                });
            }

            bookingApi.cancelBookingRequest(onCancelSuccess, onCancelFailure, user.id, bookingInfo.id);
        }

    }

    function handleCloseResultMessage() {
        setEditBookingResult({
            status: null,
            message: ""
        })
        callRefresh(true);
    }

    return (
        <div
            className="edit-box"
            // onClick={handleEditBoxOnClick}
            onKeyDown={handleBookingRequestOnKeydown}
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
                            <input type="text" disabled value={bookingRequest.slot?.lecturer?.name} />
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
                {status != null &&
                    <ActionResultMessage
                        status={status}
                        message={message}
                        closeCallBack={handleCloseResultMessage}
                    />
                }
                <div className="box__bottom">
                    {
                        bookingStatus === BOOKING_REQUEST_STATUS_WAITING
                        &&
                        <button
                            className="box__bottom__update"
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
                            className="box__bottom__remove"
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
                            className="box__bottom__cancel"
                            onClick={handleBookingRequestCancel}
                        >
                            Cancel Request
                        </div>
                    }
                    <div
                        tabIndex="0"
                        className="box__bottom__close"
                        onClick={handleCloseBookingRequest}
                    >
                        Close
                    </div>
                </div>

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