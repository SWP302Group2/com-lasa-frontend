function TimeOption({ item, selectedTime, onClickCallback }) {
    function handleOnClick(event) {
        onClickCallback(event, item);
    }
    return (
        <p
            className={"time-filter__option " +
                (selectedTime?.id === item?.id ? "time-filter__option--selected" : "")}
            onClick={handleOnClick}
        >
            {item.name}
        </p>
    );
}

export default TimeOption;