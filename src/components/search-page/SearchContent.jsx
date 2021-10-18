// import { useState } from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import lecturerApi from "../../api/lecturerApi";
import majorApi from "../../api/majorApi";
import slotApi from "../../api/slotApi";
import slotTopicDetailApi from "../../api/slotTopicDetailApi";
// import { useHistory } from "react-router";
import "../../assets/css/searchContent.css";
// import SearchBar from "./SearchBar";
import SearchBar from "./SearchBar";
import SearchFilter from "./SearchFilter";
import SearchResult from "./SearchResult";

function SearchContent() {
    const searchCriteria = useSelector(state => state.search);
    const [isCalledOneTimeApi, setIsCalledOneTimeApi] = useState(false);
    const [majorsWithTopics, setMajorsWithTopics] = useState([]);
    const [lecturers, setLecturers] = useState([]);
    const [matchedSlots, setMatchedSlots] = useState([]);
    const [isFilterWithTopic, setIsFilterWithTopic] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSearchNotMatched, setIsSearchNotMatched] = useState(false);

    function startSearching() {
        console.log("Search criteria");
        console.log(searchCriteria);
        setIsLoading(true);
        setIsSearchNotMatched(false);
        if (searchCriteria.searchValue &&
            Array.isArray(searchCriteria.lecturers) &&
            searchCriteria.lecturers.length === 0) {
            setIsLoading(false);
            setIsSearchNotMatched(true);
            console.log("Your search does not match any lecturer");
            return;
        }
        slotApi.searchAllSlots(searchCriteria, onSearchSuccess, onSearchFail);
    }

    function onSearchSuccess(data) {
        console.log("Search slot success:");
        console.log(data);
        if (!Array.isArray(data) || data.length === 0) {
            setMatchedSlots([]);
            setIsLoading(false);
            setIsSearchNotMatched(true);
            return;
        }
        setMatchedSlots(data);
        setIsFilterWithTopic(false);
    }

    function onSearchFail(responses) {
        console.log(responses);
        setMatchedSlots([]);
        setIsLoading(false);
    }

    useEffect(() => {
        if (!isCalledOneTimeApi) {
            majorApi.getMajorsWithTopics(
                onGetMajorsWithTopicsSuccess,
                onGetMajorsWithTopicsFailure
            );
            lecturerApi.getAllLecturers(
                onGetLecturerSuccess,
                onGetLecturerFailure
            );
            setIsCalledOneTimeApi(true);
        }

        if (!isFilterWithTopic) {
            const slotIds = [...matchedSlots].map(slot => slot.id);
            slotTopicDetailApi.getAllSlotTopicDetailBySlotIds(slotIds, onGetDetailSuccess, onGetDetailFailure)
        }

        function onGetDetailSuccess(data) {
            console.log("Detail");
            console.log(data)
            if (!Array.isArray(data) || data.length === 0) {
                setMatchedSlots([]);
                setIsFilterWithTopic(true);
                setIsSearchNotMatched(true);
                return;
            }

            let newMatchedSlots = [...matchedSlots];
            newMatchedSlots.forEach(slot => slot.topics = addTopicsToSlot(slot.id, data));
            newMatchedSlots.forEach(slot => slot.topics = updateTopics(slot.topics));
            if (searchCriteria.topics?.length !== 0) {
                data = [...data].filter(slotTopicDetail => isMatchedTopics(slotTopicDetail.topicId));
                newMatchedSlots = [...newMatchedSlots].filter(slot => removeUnMatchedSlot(slot.id, data));
            }
            setMatchedSlots(newMatchedSlots);
            setIsSearchNotMatched(newMatchedSlots.length === 0);
            console.log("NEw matchedSlot");
            console.log(newMatchedSlots);
            setIsFilterWithTopic(true);
        }

        function addTopicsToSlot(id, data) {
            const topics = [];
            data.forEach(slotTopicDetail => {
                if (slotTopicDetail.slotId === id) {
                    topics.push({ id: slotTopicDetail.topicId });
                }
            })
            return topics;
        }

        function updateTopics(topics) {
            const updatedTopics = [...topics];
            updatedTopics.forEach(topic => {
                majorsWithTopics.find(major => {
                    return major.topics.find(item => {
                        if (topic.id === item.id) {
                            for (let prop in item) {
                                topic[prop] = item[prop];
                            }
                            return true;
                        }
                        return false;
                    })
                })
            })
            return updatedTopics;
        }

        function onGetDetailFailure(responses) {
            console.log(responses);
            setIsLoading(false);
        }

        function isMatchedTopics(topicId) {
            return [...searchCriteria.topics].find(id => id === topicId);
        }

        function removeUnMatchedSlot(id, data) {
            return [...data].find(slotTopicDetail => id === slotTopicDetail.slotId);
        }

        function onGetLecturerSuccess(data) {
            console.log("Get lecturer success:");
            console.log(data);
            setLecturers(data);
        }

        function onGetLecturerFailure(response, status, message) {
            console.log(response);
        }

        function onGetMajorsWithTopicsSuccess(data) {
            console.log("Get major success: ");
            console.log(data);
            setMajorsWithTopics(Array.isArray(data) ? data : []);
        }

        function onGetMajorsWithTopicsFailure(response, status, message) {
            console.log(response);
        }

    }, [isFilterWithTopic, isCalledOneTimeApi, searchCriteria, matchedSlots, majorsWithTopics])

    return (
        <div className="search-content root-content">
            <h1 className="search-content__title">
                Search the right Lecturer for you
            </h1>
            <SearchBar
                startSearching={startSearching}
                lecturers={lecturers} />
            <SearchFilter
                startSearching={startSearching}
                majorsWithTopics={majorsWithTopics} />
            <SearchResult
                matchedSlots={matchedSlots}
                isFilterWithTopic={isFilterWithTopic}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                lecturers={lecturers}
                isSearchNotMatched={isSearchNotMatched} />
        </div>
    );
}

export default SearchContent;