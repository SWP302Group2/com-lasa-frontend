import { useEffect, useState } from "react";

import "react-datepicker/dist/react-datepicker.css";
import slotApi from "../../api/slotApi";
import topicApi from "../../api/topicApi";
import ErrorMessage from "../ErrorMessage";
import SelectedTopics from "../SelectedTopics";
import SuccessfulMessage from "../SuccessfulMessage";
import TopicPicker from "../TopicPicker";


function CreateSlotBox() {
    var tzoffset = new Date().getTimezoneOffset();
    var today = (new Date(Date.now() - tzoffset * 60000)).toISOString().split(".")[0];

    const [timeStart, setTimeStart] = useState(today);
    const [period, setPeriod] = useState(30);
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [topics, setTopics] = useState([]);
    const [{ status, message }, setCreateSlotResult] = useState({ status: null, message: null });
    const [{ invalidStartTime, invalidPeriod }, setInvalidMessage]
        = useState({ invalidStartTime: "", invalidPeriod: "" });

    function handleTimeStartChange(event) {
        const newTimeStart = event.target.value;
        console.log(newTimeStart);
        switch (isInvalidTimeStart(newTimeStart)) {
            case 1: {
                setInvalidMessage({ invalidStartTime: "Invalid time. Please make sure you are not cheating." })
                return;
            }
            case 2: {
                setInvalidMessage({ invalidStartTime: "You should create the slot one hour before the meeting." })
                return;
            }
            default: {
                //nothing
            }
        }
        setInvalidMessage({ invalidStartTime: "" });
        setTimeStart(newTimeStart);
    }

    function isInvalidTimeStart(timeStart) {
        const timeStartObject = new Date(timeStart);
        if (!timeStartObject) return 1;

        let now = new Date();
        now.setMinutes(now.getMinutes() + 60);

        if (timeStartObject < now) return 2;
        return 0;
    }

    function handlePeriodChange(event) {
        const newPeriod = Number.parseInt(event.target.value || 0);
        if (isInvalidPeriod(newPeriod)) {
            setInvalidMessage({ invalidPeriod: "Invalid period. Please try again." })
            return;
        };

        const timeStartObject = new Date(timeStart);
        const timeEndObject = new Date(timeStartObject);
        timeEndObject.setMinutes(timeEndObject.getMinutes() + newPeriod);

        if (timeEndObject.getDate() !== timeStartObject.getDate()) {
            setInvalidMessage({ invalidPeriod: "The meeting should end in same day it started." })
            return;
        }
        setInvalidMessage({ invalidPeriod: "" })
        setPeriod(newPeriod);
    }

    function isInvalidPeriod(period) {
        return !period || period < 30 || period % 15 !== 0
    }

    function handleRemoveItem(event, removedTopic) {
        const newSelectedTopic = [...selectedTopics].filter(topic =>
            topic.id !== removedTopic.id
        );
        setSelectedTopics(newSelectedTopic);
    }

    function handleCreateSlotSubmit(event) {
        event.preventDefault();

        let isError = false;
        switch (isInvalidTimeStart(timeStart)) {
            case 1: {
                isError = true;
                setInvalidMessage({ invalidStartTime: "Invalid time. Please make sure you are not cheating." })
                break;
            }
            case 2: {
                isError = true;
                setInvalidMessage({ invalidStartTime: "You should create the slot one hour before the meeting." })
                break;
            }
            default: {
                //nothing
            }
        }

        if (isInvalidPeriod(period)) {
            isError = true;
            setInvalidMessage({ invalidPeriod: "Invalid period. Please try again." })
        }

        const timeStartObject = new Date(timeStart);
        const timeEndObject = new Date(timeStartObject);
        timeEndObject.setMinutes(timeEndObject.getMinutes() + period);
        if (timeEndObject.getDate() !== timeStartObject.getDate()) {
            setInvalidMessage({ invalidPeriod: "The meeting should end in same day it started." })
            return;
        }

        if (isError) return;

        callCreateSlot();
    }

    function callCreateSlot() {
        const onCreateSuccess = (data) => {
            console.log("Create slots success:");
            console.log(data);

            setCreateSlotResult({ status: 1, message: "Create successful." })
        }

        const onCreateFailed = (response, status, message) => {
            console.log("Create slots false:");
            console.log(response);

            setCreateSlotResult({ status: 0, message: "Create failed." })
        }

        slotApi.createSlot(timeStart, period, selectedTopics, onCreateSuccess, onCreateFailed);
    }


    useEffect(() => {
        callGetTopics();

        function callGetTopics() {
            const onGetSuccess = (data) => {
                console.log("Lecturer slot dashboard get topic success:");
                console.log(data);
                setTopics(data);
            }

            const onGetFailure = (response, status, message) => {
                console.log("Lecturer slot dashboard get topic failed:");
                console.log(response);
                setTopics(null);
            }

            topicApi.getTopicsNoPaging(onGetSuccess, onGetFailure);
        }
    }, [])

    return (
        <div className="create-slot-box">
            <h3>Create Topic</h3>
            <form className="box" onSubmit={handleCreateSlotSubmit}>
                <div className="box__time-start">
                    When to start the meeting?
                    <input
                        type="datetime-local"
                        value={timeStart}
                        onChange={handleTimeStartChange}
                    />
                    {invalidStartTime && <ErrorMessage message={invalidStartTime} />}
                </div>
                <div className="box__time-end">
                    <p>How long does it take?</p>
                    <input
                        type="number"
                        value={period}
                        min={30} step={15}
                        onChange={handlePeriodChange}
                    />
                    <p>Minutes</p>
                    {invalidPeriod && <ErrorMessage message={invalidPeriod} />}
                </div>
                <TopicPicker
                    topics={topics}
                    value={[...selectedTopics]}
                    onChange={setSelectedTopics}
                />
                <SelectedTopics
                    topics={[...selectedTopics]}
                    removeItemCallback={handleRemoveItem}
                >
                    <p>Your selected topics:</p>
                </SelectedTopics>
                <div className="box__bottom">
                    <button type="submit">
                        Create
                    </button>
                    {status === 1 && <SuccessfulMessage message={message} />}
                    {status === 0 && <ErrorMessage message={message} />}
                </div>
            </form>
        </div>
    );
}

export default CreateSlotBox;