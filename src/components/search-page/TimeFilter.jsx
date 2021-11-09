import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { timeList } from "../../data/timeList";
import { updateTimeToSearchCriteria } from "../../redux/actions/search";
import TimeOption from "./TimeOption";



function TimeFilter({ invokeSearch }) {
    const [isUpdateTime, setIsUpdateTime] = useState(false);
    const time = useSelector(state => state.search.time)
    const dispatch = useDispatch();

    function handleOptionTimeOnChange(event, item) {
        dispatch(updateTimeToSearchCriteria(item));
        setIsUpdateTime(true);
    }

    useEffect(() => {
        if (!isUpdateTime) return;

        invokeSearch();
        setIsUpdateTime(false);
    }, [dispatch, isUpdateTime, invokeSearch]);

    return (
        <div className="time-filter">
            <h3 className="time-filter__header">TIME</h3>
            <div className="time-filter__content">
                {[...timeList].map((item, index) =>
                    <TimeOption
                        key={`time__${item.id}`}
                        item={item}
                        selectedTime={time}
                        onClickCallback={handleOptionTimeOnChange}
                    />
                )}
            </div>
        </div>
    );
}

export default TimeFilter;