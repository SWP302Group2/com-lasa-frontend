function NotificationItem(props) {
    return (
        <div className="notification__item">
            <div className="notification__avatar">
                <img src={props.avatarUrl} alt="Sender avatar" height="100" width="100" />
            </div>
            <div className="notification__messageWrapper">
                <h4 className="notification__name">{props.name}</h4>
                <p className="notification__message">{props.message}</p>
                <p className="notification__time">2 hours ago</p>
            </div>
        </div>
    );
}

export default NotificationItem;