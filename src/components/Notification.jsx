import NotificationItem from "./NotificationItem";

function Notification({ closeBurger, closeNotification, closeUserInfo }) {
    function handleNotiClickEvent() {
        closeBurger();
        closeUserInfo();

        const notiList = document.querySelector(".header .notification__list");
        notiList.classList.toggle("active-notiList");
        notiList.scrollTop = 0;
    }


    const list = [
        {
            id: "1",
            avatarUrl: "https://i.pravatar.cc/100",
            name: "Trọng",
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            time: "1/2/2021"
        },
        {
            id: "2",
            avatarUrl: "https://i.pravatar.cc/100",
            name: "Hải Anh",
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            time: "1/2/2021"
        },
        {
            id: "3",
            avatarUrl: "https://i.pravatar.cc/100",
            name: "Trọng",
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            time: "1/2/2021"
        },
        {
            id: "4",
            avatarUrl: "https://i.pravatar.cc/100",
            name: "Hải Anh",
            message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            time: "1/2/2021"
        }
    ];

    return (
        <section className="notification hidden" title="Notification">
            <div
                className="notification__icon"
                onClick={handleNotiClickEvent}
            >
                <i className="material-icons">notifications</i>
            </div>
            <div className="notification__list">
                <div className="notification__headline">
                    <h4>Notifications</h4>
                    <a href="/home">See all</a>
                </div>
                {list.map((item, index) => {
                    return <NotificationItem {...item} key={"noti_" + index} />
                })}
            </div>
        </section>
    );
}

export default Notification;