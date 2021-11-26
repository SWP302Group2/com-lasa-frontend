import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import topicApi from "../../api/topicApi";
import { createNetworkError } from "../../redux/actions/error";
import { updateMeetUrlToSignupInfo, updateSignupTopics } from "../../redux/actions/signup";
import SignUpSelectedTopic from "./SignUpSelectedTopic";

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

    function handleSearchedItem(event, topic) {
        if (!topic) return;
        if (isExistInSelectedTopic(topic.id)) return;

        const newSelectedTopic = userInfo.topics || [];
        newSelectedTopic.push(topic);
        dispatch(updateSignupTopics([...newSelectedTopic]));
        hiddenSearchResultBox();
    }

    function isExistInSelectedTopic(topicId) {
        if (!Array.isArray(userInfo.topics)) return false;
        if (userInfo.topics.length <= 0) return false;
        return userInfo.topics.find(topic => topic.id === topicId);
    }

    function handleRemoveItem(event, removedTopic) {
        if (!removedTopic) return;

        const newUserTopic = userInfo.topics?.filter(topic => topic.id !== removedTopic.id);
        dispatch(updateSignupTopics(newUserTopic));
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

    useEffect(function callApiGetTopics() {
        topicApi.getTopicsNoPaging(onGetSuccess, onGetFailure);
        function onGetSuccess(data) {
            const topicData = data?.map(item => {
                delete item["@id"];
                return item;
            })
            console.log("Sign up get topic success:")
            console.log(data)
            console.log(topicData);
            setTopics(topicData);
        }

        function onGetFailure(response, status, message) {
            console.log("Sign up get topic failed:")
            console.log(response);
            if (message === "Network Error") {
                history.push(createNetworkError());
                return;
            }
        }
    }, [history])

    useEffect(() => {
        const searchBox = document.querySelector(".auth-page .sign-up__topic__search");
        const searchResultBox = document.querySelector(".auth-page .sign-up__topic__search-result");

        document.addEventListener("click", handleDomClickEvent);
        document.addEventListener("keydown", handleKeyDownEvent);

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
                            onClick={(event) => handleSearchedItem(event, topic)}
                        >
                            <i className="material-icons">add_box</i>
                            {`Topic: ${(topic?.courseId || topic.name)} Major: ${topic.majorId}`}
                        </p>
                    )}
                </div>
                <SignUpSelectedTopic
                    topics={userInfo.topics}
                    removeItemCallback={handleRemoveItem}
                />
            </div>
        </React.Fragment>
    );
}

export default LecturerOptional;