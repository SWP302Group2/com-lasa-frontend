import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newBookingRequest } from "../../redux/actions/booking";
import { STUDENT_ROLE } from "../../utils/constant";
import CreateBookingRequestBox from "./CreateBookingRequestBox";
import SlotItem from "./SlotItem";
import SlotList from "./SlotList";

function SearchResult({ matchedSlots, ...props }) {
    const [isStartToBooking, setIsStartToBooking] = useState(false);

    const user = useSelector(state => state.user)
    const dispatch = useDispatch();

    function openCreateBookingRequest(event, slot) {
        if (user.role !== STUDENT_ROLE) return;
        dispatch(newBookingRequest({ slot }));
        setIsStartToBooking(true);
    }

    return (
        <div className="search-result">
            {matchedSlots === null &&
                <div className="not-match">
                    There was no slot matching with your search.
                </div>
            }
            <SlotList>
                {Array.isArray(matchedSlots) && matchedSlots.length > 0 &&
                    [...matchedSlots].map(slot =>
                        <SlotItem
                            slot={slot}
                            key={"slot__" + slot.id}
                            openCreateBookingRequest={openCreateBookingRequest}
                        />
                    )
                }
            </SlotList>
            {isStartToBooking && <CreateBookingRequestBox setIsStartToBooking={setIsStartToBooking} />}
            {props.children}
        </div>
    );
}

export default SearchResult;