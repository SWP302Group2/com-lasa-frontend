import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import topicApi from "../../api/topicApi";
import { createNetworkError } from "../../redux/actions/error";
import { updateMeetUrlToSignupInfo, updateSignupTopics } from "../../redux/actions/signup";

function LecturerOptional({ userInfo }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [topics, setTopics] = useState([]);
    const [searchResults, setSearchResult] = useState([]);

    function handleMeetUrlChange(event) {
        const target = event?.target;
        if (target) {
            dispatch(updateMeetUrlToSignupInfo(target.value));
        }
    }

    function handleSearchTopicChange(event) {
        const value = event?.target.value.toLowerCase();

        const matchedTopic = [...topics].filter(topic =>
            topic.courseId.toLowerCase().includes(value)
        );
        setSearchResult(matchedTopic);
        activeSearchResultBox();
    }

    function handleSearchTopicFocus(event) {
        activeSearchResultBox();
        if (event.target.value === "" && searchResults.length === 0) {
            setSearchResult([...topics]);
        }
    }

    function handleSearchTopicClick(event) {
        activeSearchResultBox();
        if (event.target.value === "" && searchResults.length === 0) {
            setSearchResult([...topics]);
        }
    }

    function handleSearchResultFocus(event) {
        activeSearchResultBox(event?.target);
    }

    function handleSearchResultBlur(event) {
        hiddenSearchResultBox(event?.target);
    }

    function handleSearchItemClick(event) {
        const target = event?.target;
        if (!target) return;

        const selectedTopic = topics.find(topic =>
            topic?.id === Number.parseInt(target.getAttribute("data") || -1)
        );
        if (!selectedTopic) return;

        const signupTopics = Array.isArray(userInfo.topics) ? [...userInfo.topics] : [];
        const isExist = signupTopics?.find(topic => selectedTopic.id === topic.id);
        if (isExist) return;

        signupTopics.push(selectedTopic);
        dispatch(updateSignupTopics(signupTopics));
    }

    function handleCancleItemClick(event) {
        const deletedTopicId = Number.parseInt(event?.target.getAttribute("data"));
        const newUserTopic = userInfo.topics?.filter(topic => topic.id !== deletedTopicId);
        if (Array.isArray(newUserTopic)) {
            dispatch(updateSignupTopics(newUserTopic));
        }
    }

    function activeSearchResultBox(target) {
        if (target) {
            target.classList?.add("search-active");
            return;
        }
        const searchResultBox = document.querySelector(".auth-page .sign-up__topic__search-result");
        searchResultBox?.classList.add("search-active");
    }

    function hiddenSearchResultBox(target) {
        if (target) {
            target.classList?.remove("search-active");
            return;
        }
        const searchResultBox = document.querySelector(".auth-page .sign-up__topic__search-result");
        searchResultBox?.classList.remove("search-active");
    }

    useEffect(() => {
        const searchBox = document.querySelector(".auth-page .sign-up__topic__search");
        const searchResultBox = document.querySelector(".auth-page .sign-up__topic__search-result");

        //Start
        topicApi.getTopics(onGetSuccess, onGetFailure);
        document.addEventListener("click", handleDomClickEvent);
        document.addEventListener("keydown", handleKeyDownEvent);

        function onGetSuccess(data) {
            const topicData = data?.map(item => {
                delete item["@id"];
                return item;
            })
            console.log(topicData);
            setTopics(topicData);
        }

        function onGetFailure(response, status, message) {
            console.log(response);
            if (message === "Network Error") {
                history.push(createNetworkError());
                return;
            }
        }

        function handleDomClickEvent(event) {
            if (!searchBox || !searchResultBox) return;

            if (!searchBox.contains(event.target) && !searchResultBox.contains(event.target)) {
                hiddenSearchResultBox(searchResultBox);
            }
        }

        function handleKeyDownEvent(event) {
            if (event?.key !== "Escape") return;
            hiddenSearchResultBox(searchResultBox);
        }


        return () => {
            document.removeEventListener("keydown", handleKeyDownEvent);
            document.removeEventListener("click", handleDomClickEvent);
        }
    }, [history, setTopics])

    return (
        <React.Fragment>
            <input
                type="text"
                className="sign-up__optional__input"
                placeholder="Enter your meeting url, please make sure it works"
                value={userInfo.meetUrl || ""}
                onChange={handleMeetUrlChange}
            />

            <div className="sign-up__topic">
                <input
                    type="text"
                    className="sign-up__topic__search"
                    placeholder="Choose your topics.."
                    onChange={handleSearchTopicChange}
                    onFocus={handleSearchTopicFocus}
                    onClick={handleSearchTopicClick}
                />
                <div
                    className="sign-up__topic__search-result"
                    onFocus={handleSearchResultFocus}
                    onBlur={handleSearchResultBlur}
                    tabIndex="1"
                >
                    {[...searchResults].map(topic =>
                        <p
                            key={topic?.id}
                            className="sign-up__topic__search-item"
                            data={topic?.id}
                            onClick={handleSearchItemClick}
                        >
                            <i className="material-icons">add_box</i>
                            {`Topic: ${(topic?.courseId || topic.name)} Major: ${topic.majorId}`}
                        </p>
                    )}
                </div>
                <div className="sign-up__topic__title">Your topics:</div>
                <div className="sign-up__topic__display">
                    {Array.isArray(userInfo.topics) && [...userInfo.topics].map(topic =>
                        <p
                            key={topic?.id}
                            className="sign-up__topic__selected-item"
                        >
                            {`${(topic?.courseId || topic?.name)} ${topic?.majorId}`}
                            <i
                                className="material-icons"
                                data={topic?.id}
                                onClick={handleCancleItemClick}
                            >
                                close
                            </i>
                        </p>
                    )}
                </div>
            </div>
        </React.Fragment>
    );
}

export default LecturerOptional;