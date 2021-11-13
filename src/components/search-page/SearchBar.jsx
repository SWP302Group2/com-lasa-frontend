import { useDispatch, useSelector } from "react-redux";
import {
    updateLecturersToSearchCriteria,
    updateSearchBarValueToSearchCriteria,
    updateTopicsToSearchCriteria
} from "../../redux/actions/search";
import { FiSearch } from "react-icons/fi";
import algorithm from "../../utils/algorithm";

function SearchBar({ lecturers, topics, invokeSearch }) {
    const searchCriteria = useSelector(state => state.search)
    const dispatch = useDispatch();

    function handleSearchBarOnChange(event) {
        dispatch(updateSearchBarValueToSearchCriteria(
            event.target.value || ""
        ));
        const matchedLecturers = analysisMatchedLecturer();
        dispatch(updateLecturersToSearchCriteria(
            matchedLecturers?.length > 0 ? matchedLecturers : null
        ));
    }

    function handleSearchBarOnSubmit(event) {
        event.preventDefault();
        if (searchCriteria.searchBarValue.trim() === "") return;

        invokeSearch(true);
        scrollToSearchContent();
        const matchedLecturers = analysisMatchedLecturer();
        const matchedtopics = analysisMatchedTopics();

        dispatch(updateLecturersToSearchCriteria(
            matchedLecturers?.length > 0 ? matchedLecturers : null
        ));
        dispatch(updateTopicsToSearchCriteria(
            matchedtopics?.length > 0 ? matchedtopics : []
        ));
    }

    function analysisMatchedLecturer() {
        const result = algorithm.getMatchedListBySearchValue(
            lecturers, searchCriteria.searchBarValue, "name"
        );
        if (!Array.isArray(result)) return [];

        if (Array.isArray(searchCriteria.lecturers) && searchCriteria.lecturers.length === 0) {
            searchCriteria.lecturers.forEach(item => {
                if (!result.find(lecturer => lecturer.id !== item.id)) {
                    result.push(item);
                }
            })
        }

        return result;
    }

    function analysisMatchedTopics() {
        const searchBarValue = searchCriteria.searchBarValue;
        if (searchBarValue.length < 2) return;
        if (!Array.isArray(topics) || topics.length === 0) return;

        const result = [...topics].filter(topic => {
            if (topic.majorId.toLowerCase().includes(searchBarValue.toLowerCase())) return true;
            if (searchBarValue.toLowerCase().includes(topic.majorId.toLowerCase())) return true;

            if (searchBarValue.length < 3) return false;
            if (topic.courseId.toLowerCase().includes(searchBarValue.toLowerCase())) return true;
            if (searchBarValue.toLowerCase().includes(topic.courseId.toLowerCase())) return true;
            return false;
        });

        if (!Array.isArray(result)) return [];

        if (Array.isArray(searchCriteria.topics) && searchCriteria.topics.length === 0) {
            searchCriteria.topics.forEach(item => {
                if (!result.find(topic => topic.id !== item.id)) {
                    result.push(item);
                }
            })
        }

        return result;
    }

    function scrollToSearchContent() {
        const searchPageBody = document.querySelector(".search-content__body");
        searchPageBody?.scrollIntoView({ top: 0, behavior: "smooth" });
    }


    return (
        <div className="search-bar">
            <form onSubmit={handleSearchBarOnSubmit}>
                <input
                    type="search"
                    value={searchCriteria.searchBarValue || ""}
                    placeholder="Lecturer name, topic, or major"
                    onChange={handleSearchBarOnChange}
                />
                <button type="submit" title="Search">
                    <FiSearch className="search-icon" />
                </button>
            </form>
        </div>
    );
}

export default SearchBar;