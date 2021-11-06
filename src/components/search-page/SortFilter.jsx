import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import sortByList from "../../data/sortByList";
import { updateSortByToSearchCriteria } from "../../redux/actions/search";


function SortFilter({ invokeSearch }) {
    const [isUpdating, setIsUpdating] = useState(false);
    const sortBy = useSelector(state => state.search.sortBy)
    const dispatch = useDispatch();

    function handleOptionTimeOnChange(item) {
        dispatch(updateSortByToSearchCriteria(item));
        setIsUpdating(true);
    }

    useEffect(() => {
        if (!isUpdating) return;
        invokeSearch();
        setIsUpdating(false);
    }, [sortBy, invokeSearch, isUpdating]);

    return (
        <div className="sort-filter">
            <h3 className="sort-filter__header">SORT BY</h3>
            <div className="sort-filter__content">
                {[...sortByList].map((item) =>
                    <div
                        key={`sort_${item.id}`}
                        className={"sort-filter__option " +
                            (sortBy?.id === item?.id ? "sort-filter__option--selected" : "")}
                        onClick={() => handleOptionTimeOnChange(item)}
                    >
                        {item.name}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SortFilter;