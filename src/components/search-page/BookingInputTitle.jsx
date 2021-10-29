function BookingInputTitle({ title, callBack, ...props }) {
    return (
        <div className="box__title">
            <p>Title</p>
            <input
                type="text"
                className="booking-request__title__input"
                placeholder="Keep it short..."
                onChange={callBack}
                value={title}
            />
            {props.children}
        </div>
    );
}

export default BookingInputTitle;