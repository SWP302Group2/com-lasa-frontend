function TopicItem({ topic, handleTopicItemOnClick, isSelected }) {
    function handleClick(event) {
        handleTopicItemOnClick(event, topic);
    }

    return (
        <div
            className={`topic-filter__item ${isSelected(topic.id) && "topic-filter__selected-item"} `}
            key={`topic-item_${topic.id}`}
            data={topic.id}
            onClick={handleClick}
        >
            {topic?.courseId}
        </div>
    );
}

export default TopicItem;