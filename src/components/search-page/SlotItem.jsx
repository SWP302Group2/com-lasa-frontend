import { RANDOM_AVATAR_API } from "../../utils/constant";

function SlotItem({ slot, openCreateBookingRequest }) {
    function handleBookingButtonOnClick(event) {
        openCreateBookingRequest(event, slot);
    }

    return (
        <div className="slot">
            <div className="slot__image-area">
                <img src={slot.lecturer?.avatarUrl || RANDOM_AVATAR_API} alt="avatar"
                    width="100" height="100" />
            </div>

            <div className="slot__info-area">
                <div className="slot__name">
                    {`Mx. ${slot.lecturer?.name || "Anonymous"}`}
                </div>
                <div className="slot__datetime">
                    <div className="slot__datetime__date">{slot.timeStart.getDateString()}</div>
                    <div className="slot__datetime__time">
                        <div className="slot__datetime__start">{slot.timeStart.getTimeString()}</div>
                        <i className="material-icons">arrow_right_alt</i>
                        <div className="slot__datetime__end">{slot.timeEnd.getTimeString()}</div>
                    </div>
                </div>
                <div className="slot__topics">
                    {slot.topics?.length > 0 && [...slot.topics].map(topic =>
                        <div
                            key={`topic_${topic.id}`}
                            className="slot__topic-item"
                        >
                            <p className="slot__topic-item__courseId">{(topic?.courseId || topic?.name)}</p>
                        </div>
                    )}
                </div>

                <div className="slot__bottom">
                    <div className="slot__booking-button" onClick={handleBookingButtonOnClick} >
                        Booking
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SlotItem;