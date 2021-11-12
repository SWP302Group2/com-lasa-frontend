import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import slotApi from "../../api/slotApi";
import topicApi from "../../api/topicApi";
import ErrorMessage from "../ErrorMessage";
import CreateSlotTopicPicker from "./CreateSlotTopicPicker";
import CreateSlotSelectedTopic from "./CreateSlotSelectedTopic";
import Loader from "../Loader";
import "../../assets/css/createSlotBox.css";
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { AiOutlineClose } from "react-icons/ai";
import { newSlot, updateInvalidMessagesToSlot, updatePeriodToSlot, updateTimeEndToSlot, updateTimeStartToSlot, updateTopicsToSlot } from "../../redux/actions/slot";
import ActionResultMessage from "../search-page/ActionResultMessage";

function CreateSlotBox({ setCreateSlot, refreshCallback }) {
    const [topics, setTopics] = useState([]);
    const [{ status, message }, setCreateSlotResult] = useState({ status: null, message: null });
    const [isLoading, setIsLoading] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    const slotInfo = useSelector(state => state.slot)
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    function handleCreateBoxOnClick(event) {
        const createBox = document.querySelector(".create-slot-box");
        const topicPickerInput = createBox?.querySelector(".box__topic-picker__input");
        const prompt = createBox?.querySelector(".prompt");
        if (topicPickerInput?.contains(event?.target)) return;
        if (prompt?.contains(event?.target)) return;

        prompt?.classList.add("hide-prompt");
    }

    function handleCreateBoxOnKeyDown(event) {
        if (event.key !== "Escape") return;
        handleCloseCreateBox();
    }

    function handleCreateSlotSubmit(event) {
        event.preventDefault();

        console.log("Create slot criteria");
        console.log(slotInfo);

        let isError = false;
        if (!checkValidTimeStart(slotInfo?.timeStart)) {
            isError = true;
        }

        if (!checkValidTimeEnd(slotInfo?.timeStart, slotInfo?.timeEnd)) {
            isError = true;
        }

        if (!checkValidPeriod(slotInfo?.period)) {
            isError = true;
        }

        if (!checkValidNumberOfTopics(slotInfo?.selectedTopics)) {
            isError = true;
        }

        if (isError) return;
        setIsCreating(true);
    }

    function handleTimeStartChange(event) {
        clearAllError();

        const newTimeStartString = event.target.value;
        const newTimeStart = new Date(newTimeStartString);
        checkValidTimeStart(newTimeStart);

        const newTimeEnd = new Date(newTimeStart);
        newTimeEnd.setTime(newTimeEnd.getTime() + slotInfo?.period * 60 * 1000);
        checkValidTimeEnd(newTimeStart, newTimeEnd);

        dispatch(updateTimeStartToSlot(newTimeStart));
        dispatch(updateTimeEndToSlot(newTimeEnd));
    }

    function handlePeriodChange(event) {
        clearAllError();

        const newPeriod = Number.parseInt(event.target.value || 0);
        const newTimeEnd = new Date(slotInfo?.timeStart);
        newTimeEnd.setTime(newTimeEnd.getTime() + newPeriod * 60 * 1000);

        checkValidPeriod(newPeriod);
        checkValidTimeEnd(slotInfo?.timeStart, newTimeEnd);

        dispatch(updatePeriodToSlot(newPeriod));
        dispatch(updateTimeEndToSlot(newTimeEnd));
    }

    function checkValidTimeStart(timeStart) {
        if (!timeStart) {
            dispatch(updateInvalidMessagesToSlot({
                ...slotInfo?.invalidMessages,
                invalidStartTime: "Invalid time. Please make sure you are not cheating."
            }));
            return false;
        }

        let now = new Date();
        now.setMinutes(now.getMinutes() + 60);
        if (timeStart < now) {
            dispatch(updateInvalidMessagesToSlot({
                ...slotInfo?.invalidMessages,
                invalidStartTime: "You should create the slot one hour before the meeting."
            }));
            return false;
        }
        return true;
    }

    function checkValidTimeEnd(timeStart, timeEnd) {
        if (timeStart.getDate() !== timeEnd.getDate()) {
            dispatch(updateInvalidMessagesToSlot({
                ...slotInfo?.invalidMessages,
                invalidTimeEnd: "The meeting should end in same day it started."
            }));
            return false;
        }
        return true;
    }

    function checkValidPeriod(period) {
        if (!period || period < 30) {
            dispatch(updateInvalidMessagesToSlot({
                ...slotInfo?.invalidMessages,
                invalidPeriod: "Invalid period. Must be last at least 30 mins"
            }));
            return false;
        }
        return true;
    }

    function checkValidNumberOfTopics(selectedTopics) {
        if (!Array.isArray(selectedTopics) || selectedTopics.length < 1) {
            dispatch(updateInvalidMessagesToSlot({
                ...slotInfo?.invalidMessages,
                invalidNumberOfTopics: "A slot must have at least one topic."
            }))
            return false;
        }

        if (selectedTopics.length > 5) {
            dispatch(updateInvalidMessagesToSlot({
                ...slotInfo?.invalidMessages,
                invalidNumberOfTopics: "A slot have only at most five topics."
            }))
            return false;
        }
        return true;
    }

    function handleRemoveItem(event, removedTopic) {
        clearAllError();

        const newSelectedTopic = [...slotInfo?.selectedTopics].filter(topic =>
            topic.id !== removedTopic.id
        );

        checkValidNumberOfTopics(newSelectedTopic);
        dispatch(updateTopicsToSlot([...newSelectedTopic]));
    }

    function clearAllError() {
        dispatch(updateInvalidMessagesToSlot({}));
    }

    useEffect(activeCreateBox, []);

    useEffect(callApiGetTopics, []);

    useEffect(callApiCreateSlot, [isCreating, slotInfo, user.id, refreshCallback]);

    function activeCreateBox() {
        const createBox = document.querySelector(".create-slot-box");
        createBox?.classList.add("active-create-slot-box");
        createBox?.focus();

        return () => {
            createBox?.classList.remove("active-create-slot-box");
        }
    }

    function callApiGetTopics() {
        let unMounted = false;
        callGetTopics();

        function callGetTopics() {
            const onGetSuccess = (data) => {
                console.log("Lecturer slot dashboard get topic success:");
                console.log(data);
                if (unMounted) return;
                setTopics(data);
            }

            const onGetFailure = (response, status, message) => {
                console.log("Lecturer slot dashboard get topic failed:");
                console.log(response);
                if (unMounted) return;
                setTopics(null);
            }

            topicApi.getTopicsNoPaging(onGetSuccess, onGetFailure);
        }

        return () => unMounted = true;
    }

    function callApiCreateSlot() {
        if (!isCreating) return;
        setIsCreating(false);
        setIsLoading(true);
        callCreateSlot();

        function callCreateSlot() {
            const onCreateSuccess = (data) => {
                console.log("Create slots success:");
                console.log(data);

                setIsLoading(false);
                refreshCallback(true);
                setCreateSlotResult({ status: true, message: "Create successful." })
            }

            const onCreateFailed = (response, status, message) => {
                console.log("Create slots false:");
                console.log(response);
                setIsLoading(false);
                setCreateSlotResult({ status: false, message: "Create failed." })
            }

            slotApi.createSlot(onCreateSuccess, onCreateFailed, user.id, slotInfo);
        }
    }

    function handleCloseCreateBox() {
        const createBox = document.querySelector(".create-slot-box");
        createBox?.classList.remove("active-create-slot-box");

        setTimeout(() => {
            dispatch(newSlot());
            if (setCreateSlot) setCreateSlot(false);
        }, 300);
    }

    function handleCloseResultMessage() {
        setCreateSlotResult({ status: null, message: null })
        if (status === true) {
            setCreateSlot(false);
        }
    }

    return (
        <div
            className="create-slot-box"
            onClick={handleCreateBoxOnClick}
            onKeyDown={handleCreateBoxOnKeyDown}
            tabIndex="0"
        >
            <form
                className="box"
                onSubmit={handleCreateSlotSubmit}
            >
                <div className="box__header">
                    <h2 className="box__header__title">Create slot</h2>
                    <AiOutlineClose
                        className="box__header__close-icon"
                        onClick={handleCloseCreateBox}
                    />
                </div>
                <div className="box__content">
                    <div className="box__time-start" tabIndex="0">
                        <p className="box__title">Start</p>
                        <div className="box__control">
                            <DateTimePickerComponent
                                format='dd/MM/yy hh:mm a'
                                data-name="StartTime"
                                value={slotInfo?.timeStart || ""}
                                onChange={handleTimeStartChange}
                            />
                        </div>
                        {slotInfo?.invalidMessages?.invalidStartTime &&
                            <ErrorMessage message={slotInfo?.invalidMessages?.invalidStartTime} />
                        }
                    </div>

                    <div className="box__period" tabIndex="0">
                        <p className="box__title">Last</p>
                        <div className="box__control">
                            <input
                                type="number"
                                value={slotInfo?.period || 30}
                                min={30} step={15}
                                onChange={handlePeriodChange}
                            />
                            <p className="box__period__unit">mins</p>
                        </div>
                    </div>
                    {slotInfo?.invalidMessages?.invalidPeriod &&
                        <ErrorMessage
                            message={slotInfo?.invalidMessages?.invalidPeriod}
                        />}
                    <div className="box__time-end" tabIndex="0">
                        <p className="box__title">End</p>
                        <div className="box__control">
                            <DateTimePickerComponent
                                format='dd/MM/yy hh:mm a'
                                data-name="EndTime"
                                value={slotInfo?.timeEnd || ""}
                                disabled
                            />
                        </div>
                    </div>

                    <CreateSlotTopicPicker
                        topics={topics}
                        clearAllError={clearAllError}
                    />
                    <CreateSlotSelectedTopic
                        removeItemCallback={handleRemoveItem}
                    />
                    {slotInfo?.invalidMessages?.invalidNumberOfTopics &&
                        <ErrorMessage
                            message={slotInfo?.invalidMessages?.invalidNumberOfTopics}
                        />
                    }
                </div>
                {status != null &&
                    <ActionResultMessage
                        status={status}
                        message={message}
                        closeCallBack={handleCloseResultMessage}
                    />
                }
                {isLoading && <Loader />}
                <div className="box__bottom">
                    <button
                        className="box__bottom__create"
                        type="submit"
                    >
                        Create
                    </button>
                    <p
                        className="box__bottom__close"
                        tabIndex="0"
                        onClick={handleCloseCreateBox}
                    >
                        Close
                    </p>
                </div>
            </form>
        </div>
    );
}

export default CreateSlotBox;