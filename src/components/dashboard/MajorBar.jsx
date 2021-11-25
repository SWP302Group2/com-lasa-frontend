import { useEffect, useState } from "react";
import { AiTwotoneSetting } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import topicApi from "../../api/topicApi";
import "../../assets/css/majorBar.css"
import UserStatusBar from "./UserStatusBar";

function MajorBar({ major }) {
    const [topics, setTopics] = useState([]);
    const [isGettingTopics, setIsGettingTopics] = useState(true);

    function handleExpendTopicOnClick(event) {
        const topicList = document.querySelector(`.admin-dashboard__majors-topics .major-bar__list-topic--${major.id}`)
        const icon = event.target;

        icon?.classList.toggle("rotate-180");
        topicList?.classList.toggle("active-list-topic");
    }

    function handleEditMajorOnClick() {

    }

    useEffect(function callApiGetTopics() {
        if (!isGettingTopics) return;
        setIsGettingTopics(false);
        callApiGetTopics();

        function callApiGetTopics() {
            const onGetSuccess = (data) => {
                console.log(`Dashboard get topics of ${major.id} success:`);
                console.log(data);

                setTopics(data);
            }

            const onGetFailure = (response, status, message) => {
                console.error(`Dashboard get topics of ${major.id} failed:`);
                console.error(response);

                setTopics([]);
            }

            topicApi.getTopicsOfCurrentMajor(onGetSuccess, onGetFailure, major.id);
        }
    }, [isGettingTopics, major.id])

    return (
        <div className="major-bar" tabIndex="0">
            <div className="major-bar__info">
                <div className="major-bar__info__td major-bar__info__id">
                    {major.id || ""}
                </div>
                <div className="major-bar__info__td major-bar__info__name">
                    {major.name || ""}
                </div>
                <div className="major-bar__info__td major-bar__info__description">
                    {major.description || ""}
                </div>
                <div
                    className="major-bar__info__td major-bar__info__action"
                >
                    <AiTwotoneSetting
                        className="action-icon"
                        title="Edit"
                        onClick={handleEditMajorOnClick}
                    />
                </div>
                <div className="major-bar__info__td major-bar__info__more">
                    <BsChevronDown
                        className="expand-icon"
                        title="Topics"
                        onClick={handleExpendTopicOnClick}
                    />
                </div>
            </div>

            <div className={`major-bar__list-topic major-bar__list-topic--${major.id}`}>
                <div className="major-bar__list-topic__header">
                    <p className="major-bar__list-topic__header__th ">Name</p>
                    <p className="major-bar__list-topic__header__th ">Course</p>
                    <p className="major-bar__list-topic__header__th ">Major</p>
                    <p className="major-bar__list-topic__header__th" title="Description">Desc.</p>
                    <p className="major-bar__list-topic__header__th ">Status</p>
                    <p className="major-bar__list-topic__header__th major-bar__list-topic__header__action">Action</p>
                </div>
                {topics && topics.length > 0 && topics.map(topic =>
                    <div
                        className="topic"
                        key={`slot_${topic.id}`}
                        tabIndex="0"
                    >
                        <div className="topic__name">{topic.name}</div>
                        <div className="topic__courseId">{topic.courseId}</div>
                        <div className="topic__majorId">{topic.majorId}</div>
                        <div className="topic__description">{topic.description}</div>
                        <div className="topic__status">
                            <UserStatusBar
                                status={topic.status}
                            />
                        </div>
                        <div className="topic__action" title="Edit">
                            <AiTwotoneSetting
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MajorBar;
