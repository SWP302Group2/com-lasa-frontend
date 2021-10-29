function SelectedTopicItem({ topic, handleTopicItemOnClick }) {
    function handleClick(event) {
        handleTopicItemOnClick(event, topic);
    }

    return (
        <div
            className={`topic-filter__item topic-filter__selected-item`}
            data={topic.id}
            onClick={handleClick}
        >
            {topic.courseId || ""}
        </div>
    );
}

export default SelectedTopicItem;