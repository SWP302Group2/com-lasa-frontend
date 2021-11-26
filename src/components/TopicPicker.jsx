import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTopicsToSearchCriteria } from "../redux/actions/search";
import Prompt from "./Prompt";
import PromptItem from "./PromptItem";

function TopicPicker({ topics, invokeSearch }) {
    const [searchValue, setSearchValue] = useState("");
    const [prompt, setPrompt] = useState([]);

    const searchCriteria = useSelector(state => state.search)
    const dispatch = useDispatch();

    function handleSearchTopicChange(event) {
        const input = event.target.value || "";
        setSearchValue(input);
        const matchedTopics = calculateMatchedTopics(input);
        if (isEmptyPrompt(matchedTopics)) {
            hidePrompt();
            return;
        }
        updatePromptValue(matchedTopics);
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

    function isEmptyPrompt(prompt) {
        return Array.isArray(prompt) && prompt.length === 0;
    }

    function updatePromptValue(matchedTopics) {
        setPrompt(matchedTopics);
    }

    function calculateMatchedTopics(input) {
        return [...topics].filter(topic => {
            if (topic.courseId?.toLowerCase().includes(input.toLowerCase())) return true;
            if (topic.majorId?.toLowerCase().includes(input.toLowerCase())) return true;
            if (input.toLowerCase().includes(topic.courseId?.toLowerCase())) return true;
            if (input.toLowerCase().includes(topic.majorId?.toLowerCase())) return true;
            return false;
        });
    }

    function handleSearchTopicFocus() {
        showPrompt();
    }

    function handlePromptItemOnClick(event, selectedTopic) {
        if (!selectedTopic) return;
        if (isExistInValue(selectedTopic)) return;

        const activeItem = document.querySelector(".prompt__topic-active");
        activeItem?.classList.remove("prompt__topic-active");

        const newTopics = Array.isArray(searchCriteria.topics) ?
            searchCriteria.topics : [];
        newTopics.push(selectedTopic);
        dispatch(updateTopicsToSearchCriteria([...newTopics]));
        if (invokeSearch) {
            invokeSearch();
        }
        hidePrompt();
    }

    function isExistInValue(selectedTopic) {
        return searchCriteria.topics?.find(topic => selectedTopic.id === topic.id);
    }

    function hidePrompt() {
        const prompt = document.querySelector(".box__picker .prompt");
        const promptActiveItem = document.querySelector(".prompt__topic-active");

        prompt?.classList.add("hide-prompt");
        promptActiveItem?.classList.remove("prompt__topic-active");
    }

    function showPrompt() {
        if (isEmptyPrompt(prompt)) return;
        const promptBox = document.querySelector(".box__picker .prompt");
        promptBox?.classList.remove("hide-prompt");
    }

    useEffect(() => {
        if (isEmptyPrompt(prompt)) {
            hidePrompt();
            return;
        }
        const promptBox = document.querySelector(".box__picker .prompt");
        promptBox?.classList.remove("hide-prompt");
    }, [prompt])

    useEffect(() => {
        const searchForm = document.querySelector(".box__picker");
        document.addEventListener("click", handleDomOnClick);
        function handleDomOnClick(event) {
            if (searchForm?.contains(event.target)) return;
            hidePrompt();
        }

        return () => {
            document.removeEventListener("click", handleDomOnClick);
        }
    }, [])

    return (
        <div className="box__picker" tabIndex="0" onKeyDown={handleTopicPickerOnKeyDown}>
            <input
                type="search"
                className="box__input"
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

export default TopicPicker;
