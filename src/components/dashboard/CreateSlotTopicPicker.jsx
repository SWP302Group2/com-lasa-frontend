import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateInvalidMessagesToSlot, updateTopicsToSlot } from "../../redux/actions/slot";
import Prompt from "../Prompt";
import PromptItem from "../PromptItem";

function CreateSlotTopicPicker({ topics, clearAllError }) {
    const [searchValue, setSearchValue] = useState("");
    const [prompt, setPrompt] = useState([]);

    const slotInfo = useSelector(state => state.slot);
    const dispatch = useDispatch();

    function handleSearchTopicChange(event) {
        clearAllError();
        const input = event.target.value || "";
        setSearchValue(input);
        const matchedTopics = caculateMatchedTopics(input);
        if (isEmptyPrompt(matchedTopics)) {
            hidePrompt();
            return;
        }
        updatePromptValue(matchedTopics);
    }

    function updatePromptValue(matchedTopics) {
        setPrompt(matchedTopics);
    }

    function handleTopicPickerOnKeyDown(event) {
        const key = event.key;
        event.stopPropagation();

        if (event.key === "Escape") {
            hidePrompt();
            return;
        }

        if (key !== "ArrowUp" && key !== "ArrowDown")
            return;

        let promptActiveItem = document.querySelector(".prompt .prompt__topic-active");
        if (key === "ArrowDown") {
            if (promptActiveItem?.nextElementSibling) {
                promptActiveItem.classList.remove("prompt__topic-active");
                promptActiveItem = promptActiveItem.nextElementSibling;
                promptActiveItem.classList.add("prompt__topic-active");
            }
            if (!promptActiveItem) {
                promptActiveItem = document.querySelector(".prompt .prompt__topic");
                promptActiveItem?.classList.add("prompt__topic-active");
            }
        }

        if (key === "ArrowUp") {
            if (promptActiveItem?.previousElementSibling) {
                promptActiveItem.classList.remove("prompt__topic-active");
                promptActiveItem = promptActiveItem.previousElementSibling;
                promptActiveItem.classList.add("prompt__topic-active");
            }
            if (!promptActiveItem) {
                promptActiveItem = document.querySelector(".prompt .prompt__topic:last-child");
                promptActiveItem?.classList.add("prompt__topic-active");
            }
        }

        if (promptActiveItem) promptActiveItem.focus();
    }

    function caculateMatchedTopics(input) {
        return [...topics].filter(topic => {
            if (topic.courseId.toLowerCase().includes(input.toLowerCase())) return true;
            if (topic.majorId.toLowerCase().includes(input.toLowerCase())) return true;
            if (input.toLowerCase().includes(topic.courseId.toLowerCase())) return true;
            if (input.toLowerCase().includes(topic.majorId.toLowerCase())) return true;
            return false;
        });
    }

    function handleSearchTopicFocus() {
        showPrompt();
    }

    function handlePromptItemOnClick(event, selectedTopic) {
        if (!selectedTopic) return;
        if (isExistInValue(selectedTopic)) return;
        if (!checkValidNumberOfTopics()) return;
        const activeItem = document.querySelector(".prompt__topic-active");
        activeItem?.classList.remove("prompt__topic-active");

        const newTopics = Array.isArray(slotInfo?.selectedTopics) ? [...slotInfo?.selectedTopics] : [];
        newTopics.push(selectedTopic);
        updateSelectedTopics(newTopics);
        hidePrompt();
    }

    function checkValidNumberOfTopics() {
        if (!Array.isArray(slotInfo?.selectedTopics)) return true;
        if (slotInfo?.selectedTopics.length >= 5) {
            dispatch(updateInvalidMessagesToSlot({
                ...slotInfo?.invalidMessages,
                invalidNumberOfTopics: "A slot have only at most five topics."
            }))
            return false;
        }
        return true;
    }

    function updateSelectedTopics(newTopics) {
        dispatch(updateTopicsToSlot(newTopics));
    }

    function isExistInValue(selectedTopic) {
        return slotInfo?.selectedTopics?.find(topic => selectedTopic.id === topic.id);
    }

    function hidePrompt() {
        const prompt = document.querySelector(".prompt");
        const promptActiveItem = document.querySelector(".prompt__topic-active");

        prompt?.classList.add("hide-prompt");
        promptActiveItem?.classList.remove("prompt__topic-active");
    }

    function isEmptyPrompt(prompt) {
        return Array.isArray(prompt) && prompt.length === 0;
    }

    function showPrompt() {
        if (isEmptyPrompt(prompt)) return;
        const promptBox = document.querySelector(".prompt");
        promptBox?.classList.remove("hide-prompt");
    }

    useEffect(() => {
        if (isEmptyPrompt(prompt)) {
            hidePrompt();
            return;
        }
        const promptBox = document.querySelector(".prompt");
        promptBox?.classList.remove("hide-prompt");
    }, [prompt])

    return (
        <div className="box__topic-picker" tabIndex="0" onKeyDown={handleTopicPickerOnKeyDown}>
            <p className="box__title">Meeting topics:</p>
            <input
                type="search"
                className="box__topic-picker__input"
                value={searchValue}
                placeholder="Choose your topics.."
                onChange={handleSearchTopicChange}
                onFocus={handleSearchTopicFocus}
            />

            <Prompt>
                {prompt && prompt.length > 0 && [...prompt].map(topic =>
                    <PromptItem

                        key={topic?.id}
                        topic={topic}
                        itemOnClickCallback={handlePromptItemOnClick}
                    />
                )}
            </Prompt>
        </div>
    );
}

export default CreateSlotTopicPicker;
