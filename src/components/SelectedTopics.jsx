function SelectedTopics({ topics, removeItemCallback, ...props }) {

    return (
        <div className="box__list-topic">
            <div className="box__list-topic__title">Your choice: </div>
            {props.children}
            {topics && topics.length > 0 && [...topics].map(topic =>
                <div
                    key={`selected_${topic.id}`}
                    className="box__topic box__topic--selected"
                >
                    <p className="box__topic--selected-courseid">{(topic?.courseId || topic?.name)}</p>
                    <p className="box__topic--selected-majorid">{topic?.majorId}</p>
                    <i
                        className="material-icons box__topic--selected-remove-icon"
                        onClick={(event) => removeItemCallback(event, topic)}
                    >
                        close
                    </i>
                </div>
            )}
        </div>
    );
}

export default SelectedTopics;