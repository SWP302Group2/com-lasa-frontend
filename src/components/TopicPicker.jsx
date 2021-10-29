import { useEffect, useState } from "react";
import Prompt from "./Prompt";
import PromptItem from "./PromptItem";

function TopicPicker({ topics, value, onChange }) {
    const [searchValue, setSearchValue] = useState("");
    const [prompt, setPrompt] = useState([]);

    function handleSearchTopicChange(event) {
        const input = event.target.value || "";
        setSearchValue(input);
        caculateMatchedTopics(input);
    }

    function handleTopicPickerOnKeyDown(event) {
        const key = event.key;

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
        const matchedTopics = [...topics].filter(topic => {
            if (topic.courseId.toLowerCase().includes(input.toLowerCase())) return true;
            if (topic.majorId.toLowerCase().includes(input.toLowerCase())) return true;
            if (input.toLowerCase().includes(topic.courseId.toLowerCase())) return true;
            if (input.toLowerCase().includes(topic.majorId.toLowerCase())) return true;
            return false;
        });
        setPrompt(matchedTopics);
    }

    function handleSearchTopicFocus() {
        showPrompt();
    }

    function handlePromptItemOnClick(event, selectedTopic) {
        if (!selectedTopic) return;
        if (isExistInValue(selectedTopic)) return;

        if (event.target) {
            event.target.style.animation = `prompt-topic-click 50ms ease-in-out`;
            setTimeout(() => {
                if (event.target) {
                    event.target.style.animation = null;
                }
            }, 200);
        }
        value.push(selectedTopic);
        onChange(value);
    }

    function isExistInValue(selectedTopic) {
        return value?.find(topic => selectedTopic.id === topic.id);
    }

    function hidePrompt() {
        const prompt = document.querySelector(".prompt");
        const promptActiveItem = document.querySelector(".prompt__topic-active");

        prompt?.classList.add("hide-prompt");
        promptActiveItem?.classList.remove("prompt__topic-active");
    }

    function showPrompt() {
        const prompt = document.querySelector(".prompt");
        prompt?.classList.remove("hide-prompt");
    }

    useEffect(() => {
        const searchForm = document.querySelector(".box__picker");
        const start = () => {
            document.addEventListener("click", handleDomOnClick);
            if (searchValue) {
                showPrompt();
            }
        }
        start();

        function handleDomOnClick(event) {
            if (searchForm?.contains(event.target)) return;
            hidePrompt();
        }
    }, [searchValue])

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
