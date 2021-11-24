import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { newBookingRequest } from "../../redux/actions/booking";
import { STUDENT_ROLE } from "../../utils/constant";
import BottomErrorMessage from "./BottomErrorMessage";
import CreateBookingRequestBox from "./CreateBookingRequestBox";
import SlotList from "./SlotList";

function SearchResult({ matchedSlots, ...props }) {
    const [isStartToBooking, setIsStartToBooking] = useState(false);

    const user = useSelector(state => state.user)
    const dispatch = useDispatch();

    function openCreateBookingRequest(event, slot) {
        dispatch(newBookingRequest({ slot }));
        setIsStartToBooking(true);
    }

    function closeCreateBookingRequest() {
        setIsStartToBooking(false);
    }

    return (
        <div className="search-result">
            {matchedSlots === null &&
                <div className="not-match">
                    There was no slot matching with your search.
                </div>
            }
            <SlotList
                matchedSlots={matchedSlots}
                openCreateBookingRequest={openCreateBookingRequest}
            />
            {user.role === STUDENT_ROLE && isStartToBooking &&
                <CreateBookingRequestBox setIsStartToBooking={setIsStartToBooking} />
            }
            {user.role !== STUDENT_ROLE && isStartToBooking &&
                <BottomErrorMessage
                    message={"Permission denied. You are not allowed to do it."}
                    closeCallback={closeCreateBookingRequest}
                />
            }
            {props.children}
        </div>
    );
}

export default SearchResult;