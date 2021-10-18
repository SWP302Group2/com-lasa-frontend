import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    updateLecturersToSearchCriteria,
    updateSearchValueToSearchCriteria
} from "../../redux/actions/search";

function SearchBar({ startSearching, lecturers }) {
    const dispatch = useDispatch();
    const [lecturerPrompt, setLecturerPrompt] = useState([]);
    const searchValue = useSelector(state => state.search.searchValue);

    function handleSearchInputChange(event) {
        const input = event?.target?.value || "";
        dispatch(updateSearchValueToSearchCriteria(input));
        processLecturerPrompt(input);
    }

    function processLecturerPrompt(input) {
        if (!input) {
            setLecturerPrompt([]);
            disableLecturerPromptWithSearchBox()
            dispatch(updateLecturersToSearchCriteria([]));
            return;
        };

        const matchedLecuturers = [...lecturers].filter(lecturer => {
            if (!lecturer.name) return false;
            //nml : nomalize
            const nmlLecturerName = lecturer.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
            const nmlInput = input.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
            return nmlLecturerName.includes(nmlInput) || nmlInput.includes(nmlLecturerName);
        });

        if (!Array.isArray(matchedLecuturers) || matchedLecuturers.length === 0) {
            dispatch(updateLecturersToSearchCriteria([]));
            disableLecturerPromptWithSearchBox()
            return;
        }

        setLecturerPrompt(matchedLecuturers.slice(0, 10));
        activeLecturerPromptWithSearchBox();
        dispatch(updateLecturersToSearchCriteria(matchedLecuturers));
    }

    function activeLecturerPromptWithSearchBox() {
        const searchBox = document.querySelector(".search-content .search-box");
        const prompt = document.querySelector(".search-content .search-box__prompt");
        searchBox?.classList.add("active-search-box-with-prompt");
        prompt?.classList.add("active-search-box-prompt");
    }

    function disableLecturerPromptWithSearchBox() {
        const searchBox = document.querySelector(".search-content .search-box");
        const prompt = document.querySelector(".search-content .search-box__prompt");
        searchBox?.classList.remove("active-search-box-with-prompt");
        prompt?.classList.remove("active-search-box-prompt");
    }

    function handleSearchInputKeyDown(event) {
        if (event.code !== "Enter") return;
        disableLecturerPromptWithSearchBox();
        startSearching();
    }

    function handleSearchIconOnClick(event) {
        disableLecturerPromptWithSearchBox();
        startSearching();
    }

    useEffect(() => {
        //Init
        const searchBox = document.querySelector(".search-content .search-box");
        const prompt = document.querySelector(".search-content .search-box__prompt");
        document.addEventListener("click", handleDomClickForSearchBox)

        function handleDomClickForSearchBox(event) {
            if (searchBox.contains(event.target) || prompt.contains(event.target))
                return;
            disableLecturerPromptWithSearchBox();
        }

    }, [searchValue, lecturerPrompt]);

    return (
        <div className="search-bar">
            <div className="search-box">
                <div className="search-box__icon">
                    <i
                        className="material-icons"
                        onClick={handleSearchIconOnClick}
                    >search</i>
                </div>
                <input
                    type="search"
                    className="search-box__input"
                    placeholder="Filter your search with lecturer name..."
                    value={searchValue}
                    onChange={handleSearchInputChange}
                    onFocus={handleSearchInputChange}
                    onKeyDown={handleSearchInputKeyDown}
                />
                <div className="search-box__prompt">
                    <div className="search-box__item-area">
                        {lecturerPrompt && [...lecturerPrompt].map(lecturer =>
                            <div
                                className="search-box__prompt-item"
                                key={`promptItem_${lecturer.id}`}
                            >
                                {lecturer.name}
                            </div>
                        )}
                    </div>
                    <div className="search-box__prompt-bottom"></div>
                </div>
            </div>
        </div>
    );
}

export default SearchBar;