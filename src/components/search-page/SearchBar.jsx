import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    updateLecturersToSearchCriteria,
    updateSearchValueToSearchCriteria,
    updateTopicsToSearchCriteria
} from "../../redux/actions/search";
import algorithm from "../../utils/algorithm";

function SearchBar({ lecturers, topics, invokeSearch, buttonContent, ...props }) {
    const [searchBarValue, setSearchBarValue] = useState("");
    const [isSearching, setIsSearching] = useState(false);

    const searchCriteria = useSelector(state => state.search)
    const dispatch = useDispatch();

    function handleSearchBarOnChange(event) {
        const newValue = event.target.value || "";
        setSearchBarValue(newValue);
    }

    function handleSearchBarOnSubmit(event) {
        event.preventDefault();
        scrollToSearchContent();
        if (searchBarValue.trim() === "") return;

        const matchedLecturers = analysisMatchedLecturer() || [];
        const topics = analysisMatchedTopics() || [];

        setIsSearching(true);
        dispatch(updateLecturersToSearchCriteria(matchedLecturers));

        if (matchedLecturers.length === 0 && topics.length === 0) {
            dispatch(updateSearchValueToSearchCriteria(searchBarValue));
            return;
        }

        dispatch(updateSearchValueToSearchCriteria(""));
        dispatch(updateTopicsToSearchCriteria(topics));
    }

    function analysisMatchedLecturer() {
        return algorithm.getMatchedListBySearchValue(lecturers, searchBarValue, "name");
    }

    function analysisMatchedTopics() {
        if (searchBarValue.length < 2) return;
        return [...topics].filter(topic => {
            console.log(searchBarValue);
            console.log(topic);
            if (topic.majorId.toLowerCase().includes(searchBarValue.toLowerCase())) return true;
            if (searchBarValue.toLowerCase().includes(topic.majorId.toLowerCase())) return true;

            if (searchBarValue.length < 3) return false;

            if (topic.courseId.toLowerCase().includes(searchBarValue.toLowerCase())) return true;
            if (searchBarValue.toLowerCase().includes(topic.courseId.toLowerCase())) return true;
            return false;
        }).concat(searchCriteria.topics);
    }

    function scrollToSearchContent() {
        const searchPageBody = document.querySelector(".search-content__body");
        searchPageBody?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(() => {
        if (isSearching) {
            invokeSearch();
            setIsSearching(false);
            scrollToSearchContent();
        }
    }, [isSearching, invokeSearch])

    return (
        <div className="search-bar">
            <form onSubmit={handleSearchBarOnSubmit}>
                <input
                    type="search"
                    value={searchBarValue}
                    placeholder="Search name, topic, major..."
                    onChange={handleSearchBarOnChange}
                />
                <button type="submit">{buttonContent || <i className="material-icons">search</i>}</button>
            </form>
            {props.children}
        </div>
    );
}

export default SearchBar;