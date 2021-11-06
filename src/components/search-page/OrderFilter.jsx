import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import orderByList from "../../data/orderByList";
import { updateOrderByToSearchCriteria } from "../../redux/actions/search";


function OrdrFilter({ invokeSearch }) {
    const [isUpdating, setIsUpdating] = useState(false);
    const orderBy = useSelector(state => state.search.orderBy)
    const dispatch = useDispatch();

    function handleOptionTimeOnChange(item) {
        dispatch(updateOrderByToSearchCriteria(item));
        setIsUpdating(true);
    }

    useEffect(() => {
        if (!isUpdating) return;
        invokeSearch();
        setIsUpdating(false);
    }, [orderBy, invokeSearch, isUpdating]);

    return (
        <div className="order-filter">
            <h3 className="order-filter__header">ORDER BY</h3>
            <div className="order-filter__content">
                {[...orderByList].map((item) =>
                    <div
                        key={`sort_${item.id}`}
                        className={"order-filter__option " +
                            (orderBy?.id === item?.id ? "order-filter__option--selected" : "")}
                        onClick={() => handleOptionTimeOnChange(item)}
                    >
                        {item.name}
                    </div>
                )}
            </div>
        </div>
    );
}

export default OrdrFilter;