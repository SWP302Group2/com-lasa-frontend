import { useSelector } from "react-redux";

function CreateSlotSelectedTopic({ removeItemCallback, ...props }) {
    const topics = useSelector(state => state.slot.selectedTopics)
    return (
        <div className="box__list-topic">
            {
                Array.isArray(topics) && topics.length > 0
                && [...topics].map(topic =>
                    <div
                        key={`selected_${topic?.id}`}
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
                )
            }
        </div>
    );
}

export default CreateSlotSelectedTopic;