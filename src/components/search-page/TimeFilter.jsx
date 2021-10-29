import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { timeList } from "../../data/timeList";
import { updateNumberOfDateToSearchCriteria } from "../../redux/actions/search";



function TimeFilter({ invokeSearch }) {
    const [isUpdateDays, setIsUpdateDays] = useState(false);
    const days = useSelector(state => state.search.days)
    const dispatch = useDispatch();

    function handleSelectTimeOnChange(event) {
        const value = Number.parseInt(event.target?.value) || 1;
        dispatch(updateNumberOfDateToSearchCriteria(value));
        setIsUpdateDays(true);
    }

    useEffect(() => {
        const start = () => {
            if (isUpdateDays) {
                invokeSearch();
                setIsUpdateDays(false);
            }
        }
        start();
    }, [dispatch, isUpdateDays, invokeSearch]);

    return (
        <div className="time-filter">
            <h3 className="time-filter__header">START TIME</h3>
            <div className="time-filter__content">
                <select
                    title="Choose period of time"
                    onChange={handleSelectTimeOnChange}
                    value={days}
                >
                    {[...timeList].map(item =>
                        <option
                            key={`time_${item.value}`}
                            value={item.value}
                        >
                            {item.name}
                        </option>
                    )}
                </select>
            </div>
        </div>
    );
}

export default TimeFilter;