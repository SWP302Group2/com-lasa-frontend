import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import topicApi from "../../api/topicApi";
import { createNetworkError } from "../../redux/actions/error";
import {
    updateMeetUrlToSignupInfo,
    updateMSSVToSignupInfo,
    updateProcessPosition,
    updateSignupTopics
} from "../../redux/actions/signup";

function OptionalInfo({ setPosition, setMoreInfoStep }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const userInfo = useSelector(state => state.signup.userInfo);
    const [topics, setTopics] = useState([]);
    const [searchResults, setSearchResult] = useState([]);

    function handleMSSVChange(event) {
        const target = event?.target;
        if (target) {
            dispatch(updateMSSVToSignupInfo(target.value));
        }
    }

    function handleMeetUrlChange(event) {
        const target = event?.target;
        if (target) {
            dispatch(updateMeetUrlToSignupInfo(target.value));
        }
    }

    function handleClickBackButton() {
        setMoreInfoStep(1);
    }
    function handleClickDoneButton() {
        dispatch(updateProcessPosition(3));
        setPosition(3);
    }

    function handleSearchTopicChange(event) {
        const value = event?.target.value.toLowerCase();

        const matchedTopic = topics.filter(topic => topic.courseId.toLowerCase().includes(value));
        setSearchResult(matchedTopic);
        console.log("Matched: ");
        console.log(matchedTopic);
    }

    function handleSearchTopicFocus(event) {
        const searchResultBox = document.querySelector(".auth-page .content .sign-up__topic__search-result");
        searchResultBox?.classList.add("search-active");
        if (event.target.value === "" && searchResults.length === 0) {
            setSearchResult([...topics]);
        }
    }

    function handleSearchResultFocus(event) {
        event.target?.classList?.add("search-active");
    }


    function handleSearchResultBlur(event) {
        event.target?.classList?.remove("search-active");
    }

    function handleSearchItemClick(event) {
        const target = event?.target;
        if (target) {
            const selectedTopic = topics.find(topic =>
                topic?.id === Number.parseInt(target.getAttribute("data"))
            );
            if (selectedTopic) {
                const signupTopics = Array.isArray(userInfo.topics) ? [...userInfo.topics] : [];
                const isExist = signupTopics?.find(topic => selectedTopic.id === topic.id);
                if (!isExist) {
                    signupTopics.push(selectedTopic);
                    dispatch(updateSignupTopics(signupTopics));
                }
            }
        }
    }

    function handleCancleItemClick(event) {
        const deletedTopicId = Number.parseInt(event?.target.getAttribute("data"));
        const newUserTopic = userInfo.topics?.filter(topic => topic.id !== deletedTopicId);
        if (Array.isArray(newUserTopic)) {
            dispatch(updateSignupTopics(newUserTopic));
        }
    }

    useEffect(() => {
        //Start
        const searchBox = document.querySelector(".auth-page .content .sign-up__topic__search");
        const searchResultBox = document.querySelector(".auth-page .content .sign-up__topic__search-result");
        (() => {
            topicApi.getTopics(onGetSuccess, onGetFailure);
            document.addEventListener("click", handleDomClickEvent);
        })();

        function handleDomClickEvent(event) {
            if (!searchBox && !searchResultBox) {
                return;
            }
            if (!searchBox.contains(event.target) && !searchResultBox.contains(event.target)) {
                searchResultBox.classList.remove("search-active");
            }
        }
        function onGetSuccess(data) {
            setTopics(data);
        }

        function onGetFailure(response, status, message) {
            console.log(response);
            if (message === "Network Error") {
                history.push(createNetworkError());
                return;
            }
            topicApi.getTopics(onGetSuccess, onGetFailure);
        }

        return () => {
            document.removeEventListener("click", handleDomClickEvent);
        }
    }, [setTopics, history, setSearchResult])
    return (
        <React.Fragment>
            <div className="sign-up__step__title">
                More information
            </div>
            <div className="sign-up__optional">
                {userInfo.role === "STUDENT" ?
                    <input
                        type="text"
                        className="sign-up__optional__input"
                        placeholder="Student code (MSSV)"
                        value={userInfo.mssv || ""}
                        onChange={handleMSSVChange}
                    />
                    : null
                }
                {userInfo.role === "LECTURER" ?
                    <>
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
                    </>
                    : null
                }
                <p className="sign-up__optional__note">
                    To fully use our services, you need provide some information.
                    However, you can edit it later on the settings page.
                </p>
                <div className="sign-up__optional__button">
                    <button onClick={handleClickBackButton}>
                        <i className="material-icons">
                            arrow_back
                        </i>
                    </button>
                    <button onClick={handleClickDoneButton}>
                        <i className="material-icons">
                            done
                        </i>
                    </button>
                </div>

            </div>
        </React.Fragment >
    );
}

export default OptionalInfo;