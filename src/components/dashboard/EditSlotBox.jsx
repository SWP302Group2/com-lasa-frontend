import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import slotApi from "../../api/slotApi";
import topicApi from "../../api/topicApi";
import ErrorMessage from "../ErrorMessage";
import ActionResultMessage from "../search-page/ActionResultMessage";
import CreateSlotTopicPicker from "./CreateSlotTopicPicker";
import Loader from "../Loader";
import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { AiOutlineClose } from "react-icons/ai";
import { updateInvalidMessagesToSlot, updateTopicsToSlot } from "../../redux/actions/slot";
import "../../assets/css/editSlotBox.css";
import { BOOKING_REQUEST_STATUS_WAITING, SLOT_STATUS_CANCELED, SLOT_STATUS_FINISHED, SLOT_STATUS_WAITING } from "../../utils/constant";
import EditSlotSelectedTopic from "./EditSlotSelectedTopic";

function EditSlotBox({ setEditSlot, refreshCallback, setSlotControl }) {
    const [topics, setTopics] = useState([]);
    const [{ status, message }, setActionSlotResult] = useState({ status: null, message: null });
    const [isLoading, setIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isCanceling, setIsCanceling] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);

    const slotInfo = useSelector(state => state.slot)
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    function handleEditBoxOnClick(event) {
        const createBox = document.querySelector(".edit-slot-box");
        const topicPickerInput = createBox?.querySelector(".box__topic-picker__input");
        const prompt = createBox?.querySelector(".prompt");
        if (topicPickerInput?.contains(event?.target)) return;
        if (prompt?.contains(event?.target)) return;

        prompt?.classList.add("hide-prompt");
    }

    function handleEditBoxOnKeyDown(event) {
        if (event.key !== "Escape") return;
        handleCloseEditBox();
    }

    function handleEditSlotSubmit(event) {
        event.preventDefault();

        console.log("Edit slot criteria");
        console.log(slotInfo);

        let isError = false;
        if (!checkValidNumberOfTopics(slotInfo?.selectedTopics)) {
            isError = true;
        }

        if (isError) return;
        setIsEditing(true);
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

    function handleCancelButtonOnclick() {
        setIsCanceling(true);
    }

    function handleRemoveButtonOnClick() {
        setIsRemoving(true);
    }

    useEffect(activeEditBox, []);

    useEffect(callApiGetTopics, []);

    useEffect(callApiUpdateSlot, [isEditing, slotInfo, user.id, refreshCallback]);

    useEffect(callApiCancelSlot, [isCanceling, refreshCallback, user.id, slotInfo, setEditSlot, setSlotControl]);

    useEffect(callApiRemoveSlot, [isRemoving, refreshCallback, slotInfo, setEditSlot, setSlotControl]);



    function activeEditBox() {
        const editBox = document.querySelector(".edit-slot-box");
        editBox?.classList.add("active-edit-slot-box");
        editBox?.focus();

        return () => {
            editBox?.classList.remove("active-edit-slot-box");
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

    function callApiUpdateSlot() {
        if (!isEditing) return;
        setIsEditing(false);
        setIsLoading(true);
        callUpdateSlot();

        function callUpdateSlot() {
            const onUpdateSuccess = (data) => {
                console.log("Update slots success:");
                console.log(data);
                setIsLoading(false);
                setActionSlotResult({ status: true, message: "Update successful." })
            }

            const onUpdateFailed = (response, status, message) => {
                console.log("Update slots false:");
                console.log(response);
                setIsLoading(false);
                setActionSlotResult({ status: false, message: "Update failed." })
            }

            slotApi.updateSlot(onUpdateSuccess, onUpdateFailed, user.id, slotInfo.id, slotInfo.selectedTopics);
        }
    }

    function callApiCancelSlot() {
        if (!isCanceling) return;

        setIsLoading(true);
        setIsCanceling(false);
        callCancelSlot();

        function callCancelSlot() {
            const onCancelSuccess = (data) => {
                console.log("Cancel slot success:");
                console.log(data);
                setIsLoading(false);
                setActionSlotResult({ status: true, message: "Cancel successful." })
            }

            const onCancelFailure = (response, status, message) => {
                console.log("Cancel slot failed:");
                console.log(response);
                setIsLoading(false);

                setActionSlotResult({ status: false, message: "Cancel failed." })
            }

            slotApi.cancelSlot(onCancelSuccess, onCancelFailure, user.id, slotInfo.id);
        }
    }

    function callApiRemoveSlot() {
        if (!isRemoving) return;

        setIsLoading(true);
        setIsRemoving(false);
        callRemoveSlot();

        function callRemoveSlot() {
            const onRemoveSuccess = (data) => {
                console.log("Remove slot success:");
                console.log(data);
                setIsLoading(false);
                setActionSlotResult({ status: true, message: "Remove successful." })
            }

            const onRemoveFailure = (response, status, message) => {
                console.log("Remove slot failed:");
                console.log(response);
                setIsLoading(false);

                setActionSlotResult({ status: false, message: "Remove failed." })
            }

            slotApi.removeSlot(onRemoveSuccess, onRemoveFailure, slotInfo.id);
        }
    }


    function handleCloseEditBox() {
        const EditBox = document.querySelector(".edit-slot-box");
        EditBox?.classList.remove("active-edit-slot-box");

        setTimeout(() => {
            if (setEditSlot) setEditSlot(false);
        }, 300);
    }

    function handleCloseResultMessage() {
        setActionSlotResult({
            status: null,
            message: null
        });

        setTimeout(() => {
            setEditSlot(false);
            if (refreshCallback) refreshCallback();
            // if (setSlotControl) setSlotControl(false);
        }, 300)
    }

    return (
        <div
            className="edit-slot-box"
            onClick={handleEditBoxOnClick}
            onKeyDown={handleEditBoxOnKeyDown}
        >
            <form className="box" onSubmit={handleEditSlotSubmit}>
                <div className="box__header">
                    <h2 className="box__header__title">Slot</h2>
                    <AiOutlineClose
                        className="box__header__close-icon"
                        onClick={handleCloseEditBox}
                    />
                </div>
                <div className="box__content">
                    <div className="box__time-start" tabIndex="0">
                        <p className="box__title">Start</p>
                        <div className="control">
                            <DateTimePickerComponent
                                format='dd/MM/yy hh:mm a'
                                data-name="StartTime"
                                className="box__time-start__picker"
                                value={slotInfo?.timeStart || ""}
                                disabled={true}
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
                                className="box__period__picker"
                                value={slotInfo?.period || 30}
                                min={30} step={15}
                                disabled={true}
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
                                className="box__time-end__picker"
                                value={slotInfo?.timeEnd || ""}
                                disabled
                            />
                        </div>
                    </div>

                    {slotInfo.status === BOOKING_REQUEST_STATUS_WAITING
                        && <CreateSlotTopicPicker
                            topics={topics}
                            clearAllError={clearAllError}
                        />
                    }
                    <EditSlotSelectedTopic
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
                    {
                        (slotInfo.status === SLOT_STATUS_CANCELED
                            || slotInfo.status === SLOT_STATUS_FINISHED)
                        &&
                        <p
                            className="box__bottom__remove"
                            tabIndex="0"
                            onClick={handleRemoveButtonOnClick}
                        >
                            Remove
                        </p>
                    }
                    {
                        slotInfo.status === SLOT_STATUS_WAITING
                        &&
                        <p
                            className="box__bottom__cancel"
                            type="submit"
                            onClick={handleCancelButtonOnclick}
                        >
                            Cancel slot
                        </p>
                    }
                    {
                        slotInfo.status === SLOT_STATUS_WAITING
                        &&
                        <button
                            className="box__bottom__save"
                            type="submit"
                        >
                            Save
                        </button>
                    }
                    <p
                        className="box__bottom__close"
                        tabIndex="0"
                        onClick={handleCloseEditBox}
                    >
                        Close
                    </p>
                </div>
            </form>
        </div>
    );
}

export default EditSlotBox;