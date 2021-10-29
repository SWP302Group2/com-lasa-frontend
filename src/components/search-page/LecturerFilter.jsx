import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import algorithm from "../../utils/algorithm";
import InputPrompt from "./InputPrompt";
import {
    updateLecturersToSearchCriteria,
    updateSearchValueToSearchCriteria
} from "../../redux/actions/search";

function LecturerFilter({ lecturers, invokeSearch }) {
    const [isInvokingSearch, setIsInvokingSearch] = useState(false);
    const [prompt, setPrompt] = useState([]);

    const searchValue = useSelector(state => state.search.searchValue);
    const dispatch = useDispatch();

    function handleSearchInputChange(event) {
        const input = event.target.value || "";
        showPrompt();
        calculateMatchedLecturer(input.trim());
        dispatch(updateSearchValueToSearchCriteria(input));
    }

    function handlePromptItemOnClick(event) {
        const itemValue = event.target.getAttribute("data") || "";
        calculateMatchedLecturer(itemValue);
        dispatch(updateSearchValueToSearchCriteria(itemValue));
        setIsInvokingSearch(true);
        hidePrompt();
        document.querySelector(".lecturer-filter__input").focus();
    }

    function calculateMatchedLecturer(input) {
        let matchedLecturers = [];
        if (input !== "") {
            matchedLecturers =
                algorithm.getMatchedListBySearchValue(lecturers, input, "name");
        };

        dispatch(updateLecturersToSearchCriteria(
            Array.isArray(matchedLecturers) ? matchedLecturers : []
        ));
        setPrompt(matchedLecturers.slice(0, 10));
    }

    function handleSearchBoxOnSubmit(event) {
        event.preventDefault();
        calculateMatchedLecturer(searchValue);
        hidePrompt();
        setIsInvokingSearch(true);
    }

    function hidePrompt() {
        const prompt = document.querySelector(".search-content .lecturer-filter .prompt");
        const promptActiveItem = document.querySelector(".search-content .lecturer-filter .prompt-item-active");

        prompt?.classList.add("lecturer-filter-hide-prompt");
        promptActiveItem?.classList.remove("prompt-item-active");
    }

    function showPrompt() {
        const prompt = document.querySelector(".search-content .lecturer-filter .prompt");
        prompt?.classList.remove("lecturer-filter-hide-prompt");
    }

    function handleSearchFormOnKeyDown(event) {
        const key = event.key;
        if (key !== "ArrowUp" && key !== "ArrowDown")
            return;

        let promptActiveItem = document.querySelector(".search-content .lecturer-filter .prompt-item-active");
        if (key === "ArrowDown") {
            if (promptActiveItem?.nextElementSibling) {
                promptActiveItem.classList.remove("prompt-item-active");
                promptActiveItem = promptActiveItem.nextElementSibling;
                promptActiveItem.classList.add("prompt-item-active");
            }
            if (!promptActiveItem) {
                promptActiveItem = document.querySelector(".search-content .lecturer-filter .prompt__item");
                promptActiveItem?.classList.add("prompt-item-active");
            }
        }

        if (key === "ArrowUp") {
            if (promptActiveItem?.previousElementSibling) {
                promptActiveItem.classList.remove("prompt-item-active");
                promptActiveItem = promptActiveItem.previousElementSibling;
                promptActiveItem.classList.add("prompt-item-active");
            }
            if (!promptActiveItem) {
                promptActiveItem = document.querySelector(".search-content .lecturer-filter .prompt__item:last-child");
                promptActiveItem?.classList.add("prompt-item-active");
            }
        }

        const promptItemValue = promptActiveItem?.getAttribute("data") || "";
        updateSearchCriterial(promptItemValue);
    }

    function updateSearchCriterial(value) {
        dispatch(updateSearchValueToSearchCriteria(value));
        let matchedLecturers = [];
        if (value !== "") {
            matchedLecturers = algorithm.getMatchedListBySearchValue(
                lecturers, value, "name"
            );
        };

        dispatch(updateLecturersToSearchCriteria(
            Array.isArray(matchedLecturers) ? matchedLecturers : []
        ));
    }

    useEffect(() => {
        if (isInvokingSearch === true) {
            invokeSearch();
            setIsInvokingSearch(false);
        }
    }, [isInvokingSearch, invokeSearch])

    useEffect(() => {
        const searchForm = document.querySelector(".search-content .lecturer-filter form");
        const start = () => {
            document.addEventListener("click", handleDomOnClickForForm);
        }
        start();

        function handleDomOnClickForForm(event) {
            if (searchForm.contains(event.target)) return;
            hidePrompt();
        }

        return () => {
            document.removeEventListener("click", handleDomOnClickForForm);
        }
    }, [dispatch]);

    return (
        <div className="lecturer-filter">
            <h3 className="lecturer-filter__header">LECTURER</h3>

            <form
                onSubmit={handleSearchBoxOnSubmit}
                onKeyDown={handleSearchFormOnKeyDown}
            >
                <input
                    className="lecturer-filter__input"
                    type="search"
                    value={searchValue}
                    placeholder="All lecturers"
                    onChange={handleSearchInputChange}
                    onFocus={showPrompt}
                />
                <button
                    className="lecturer-filter__submit"
                    type="submit"
                >
                    <i className="material-icons">search</i>
                </button>
                {prompt.length > 0 &&
                    <InputPrompt>
                        {prompt.map(lecturer =>
                            <div
                                className="prompt__item"
                                tabIndex="0"
                                data={lecturer.name}
                                key={`prompt_item_${lecturer.id}`}
                                onClick={handlePromptItemOnClick}
                            >
                                {lecturer.name}
                            </div>
                        )}
                    </InputPrompt>
                }
            </form>
        </div>
    );
}

export default LecturerFilter;