function BookingSelectTopic({ topicId, callBack, topics, ...props }) {
    return (
        <>
            <div className="box__title">Topic</div>
            <select
                className="box__select-topic"
                value={topicId}
                onChange={callBack}
            >
                <option value={-1} disabled>
                    -- Please select one topic --
                </option>
                {topics && [...topics].map(topic =>
                    <option
                        key={"booking-topic__" + topic.id}
                        value={topic.id}
                    >
                        {topic.courseId}
                    </option>
                )}
            </select>
            {props.children}
        </>
    );
}

export default BookingSelectTopic;