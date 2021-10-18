import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateQuantityToSearchCriteria, updateTopicsToSearchCriteria, updateUnitToSearchCriteria } from "../../redux/actions/search";

function SearchFilter({ startSearching, majorsWithTopics }) {
    const dispatch = useDispatch();
    const searchCriteria = useSelector(state => state.search);

    function handleSelectQuantityChange(event) {
        const quantity = Number.parseInt(event?.target?.value) || null;
        if (quantity) {
            dispatch(updateQuantityToSearchCriteria(quantity));
        }
    }

    function handleSelectUnitChange(event) {
        const unit = Number.parseInt(event?.target?.value) || null;
        if (unit) {
            dispatch(updateUnitToSearchCriteria(unit));
        }
    }

    function handleFilterTitleOnClick(event) {
        toggleSearchFilterTitleAndContent(event);
    }

    function handleCloseIconOnClick(event) {
        toggleSearchFilterTitleAndContent(event);
    }

    function toggleSearchFilterTitleAndContent() {
        const filterTitle = document.querySelector(".search-content .search-filter__title");
        const filterContent = document.querySelector(".search-content .search-filter__content");

        filterTitle.classList.toggle("active-search-filter-title");
        filterContent.classList.toggle("active-search-filter-content")

        if (!filterContent.classList.contains("active-search-filter-content")) {
            const filterContentSubject = document.querySelector(".search-content .search-filter__content__subject");
            filterContentSubject.scrollTop = 0;
        }
    }

    function handleDefaultTopicsOnClick(event) {
        dispatch(updateTopicsToSearchCriteria([]));
        clearAllTopicActive();
        startSearching();
    }

    function handleTopicItemOnClick(event) {
        const target = event.target;
        if (!target) return;

        const topicId = Number.parseInt(target.getAttribute("data") || 0);
        if (!topicId) return;

        if (isExistTopic(topicId)) {
            removeTopicOutOfSelectedTopics(topicId);
            target.classList.remove("active-topic-box-item");
            startSearching();
            return;
        }

        unCheckDefault();
        addTopicToSearchCriteria(topicId);
        target.classList?.add("active-topic-box-item");
        startSearching();
    }

    function isExistTopic(topicId) {
        const newTopics = Array.isArray(searchCriteria.topics) ? [...searchCriteria.topics] : [];
        return newTopics.find(item => item === topicId);
    }

    function removeTopicOutOfSelectedTopics(topicId) {
        let newTopics = Array.isArray(searchCriteria.topics) ? [...searchCriteria.topics] : [];
        newTopics = newTopics.filter(item => item !== topicId);
        dispatch(updateTopicsToSearchCriteria(newTopics));
    }

    function addTopicToSearchCriteria(topicId) {
        const newTopics = Array.isArray(searchCriteria.topics) ? [...searchCriteria.topics] : [];
        newTopics.push(topicId);
        dispatch(updateTopicsToSearchCriteria(newTopics));
    }

    function unCheckDefault() {
        const defaultTopics = document.querySelector(".search-content .topic-box__default");
        defaultTopics.classList.remove("active-topic-box-item");
    }

    function clearAll() {
        clearTimeToDefault();
        clearAllTopicActive();
        startSearching();
    }

    function clearTimeToDefault() {
        dispatch(updateQuantityToSearchCriteria(1));
        dispatch(updateUnitToSearchCriteria(30));
    }

    function clearAllTopicActive() {
        const activeTopicItems = document.querySelectorAll(".search-content .active-topic-box-item");
        activeTopicItems && [...activeTopicItems].forEach(topic =>
            topic?.classList?.remove("active-topic-box-item")
        );
        dispatch(updateTopicsToSearchCriteria([]));
        const defaultTopics = document.querySelector(".search-content .topic-box__default");
        defaultTopics.classList.add("active-topic-box-item");
    }

    function handleIconExpandMoreOnClick(event) {
        const filterContent = document.querySelector(".search-content .search-filter__content");
        filterContent.classList.toggle("active-search-filter-content");
    }

    useEffect(() => {
        //Initial
        const filterContentSubject = document.querySelector(".search-content .search-filter__content__subject");
        const filterTitle = document.querySelector(".search-content .search-filter__title");
        const filterContent = document.querySelector(".search-content .search-filter__content");

        document.addEventListener("click", handleDomClickEventForSearchFilter);
        scanning();

        function scanning() {
            const defaultTopics = document.querySelector(".search-content .topic-box__default");
            if (searchCriteria.topics.length === 0) {
                defaultTopics.classList.add("active-topic-box-item");
                return;
            }
            defaultTopics.classList.remove("active-topic-box-item");
        }

        function handleDomClickEventForSearchFilter(event) {
            if (filterContent.contains(event.target) || filterTitle.contains(event.target))
                return;

            filterTitle.classList.remove("active-search-filter-title");
            filterContent.classList.remove("active-search-filter-content");
            filterContentSubject.scrollTop = 0;
        }

        return () => {
            document.removeEventListener("click", handleDomClickEventForSearchFilter);
        }
    }, [searchCriteria, majorsWithTopics])

    return (
        <div className="search-filter">
            <h2
                className="search-filter__title"
                onClick={handleFilterTitleOnClick}
            >
                <p className="search-filter__title__text">Search Filters</p>
                <i className="search-filter__title__icon material-icons">expand_more</i>
                <div
                    className="search-filter__title__clear"
                    onClick={clearAll}
                >
                    Clear
                </div>
            </h2>
            <div className="search-filter__content">
                <div className="search-filter__content__close">
                    <div
                        className="search-filter__content__clear"
                        onClick={clearAll}
                    >
                        Clear
                    </div>
                    <i
                        className="material-icons"
                        onClick={handleCloseIconOnClick}
                    >close</i>
                </div>
                <div className="search-filter__content__subject">
                    <div className="time-box">
                        <h3 className="time-box__title">
                            Time filter
                        </h3>
                        <div className="time-box__control">
                            From now to
                            <select
                                className="time-box__select-time"
                                onChange={handleSelectQuantityChange}
                                value={searchCriteria?.quantity || 1}
                            >
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                                <option value={6}>6</option>
                                <option value={7}>7</option>
                                <option value={8}>8</option>
                                <option value={9}>9</option>
                            </select>
                            <select
                                className="time-box__select-time"
                                onChange={handleSelectUnitChange}
                                value={searchCriteria?.unit || 1}
                            >
                                <option value={1}>days</option>
                                <option value={7}>weeks</option>
                                <option value={30}>months</option>
                            </select>
                            later.
                        </div>
                    </div>
                    <div className="topic-box">
                        <h3 className="topic-box__title">Topic filter</h3>
                        <div className="topic-box__top-panel">
                            <div
                                className="topic-box__default"
                                onClick={handleDefaultTopicsOnClick}
                            >
                                All topics
                            </div>
                        </div>
                        {majorsWithTopics && [...majorsWithTopics].map(majors =>
                            <div
                                className="topic-box__major"
                                key={"major-with-topic_" + majors.id}
                            >
                                <h4 className="topic-box__major__title">
                                    {`${majors.id} - ${majors?.name}`}
                                </h4>

                                {majors.topics && [...majors.topics].map(topic =>
                                    <div
                                        className={`topic-box__topic-item ${isExistTopic(topic.id) ? "active-topic-box-item" : ""}`}
                                        key={`topic-item_${topic.id}`}
                                        data={topic.id}
                                        onClick={handleTopicItemOnClick}
                                    >
                                        {topic?.courseId}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <div className="search-filter__content__bottom">
                    <div
                        className="search-filter__content__more"
                        onClick={handleIconExpandMoreOnClick}
                    >
                        <i className="search-filter__more-icon material-icons">expand_more</i>
                    </div>
                </div>
            </div>
            <div className="search-filter__overlay"></div>
        </div>
    );
}

export default SearchFilter;