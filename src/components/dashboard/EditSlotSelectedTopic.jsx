import { useSelector } from "react-redux";
import { SLOT_STATUS_WAITING } from "../../utils/constant";

function EditSlotSelectedTopic({ removeItemCallback, ...props }) {
    const slotInfo = useSelector(state => state.slot);

    return (
        <div className="box__list-topic">
            {
                Array.isArray(slotInfo.selectedTopics) && slotInfo.selectedTopics.length > 0
                && [...slotInfo.selectedTopics].map(topic =>
                    <div
                        key={`selected_${topic?.id}`}
                        className="box__topic box__topic--selected"
                    >
                        <p className="box__topic--selected-courseid">{(topic?.courseId || topic?.name)}</p>
                        <p className="box__topic--selected-majorid">{topic?.majorId}</p>
                        {slotInfo.status === SLOT_STATUS_WAITING &&
                            <i
                                className="material-icons box__topic--selected-remove-icon"
                                onClick={(event) => removeItemCallback(event, topic)}
                            >
                                close
                            </i>
                        }
                    </div>
                )
            }
        </div>
    );
}

export default EditSlotSelectedTopic;