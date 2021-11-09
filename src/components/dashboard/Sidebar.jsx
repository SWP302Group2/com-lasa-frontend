function Sidebar({ ...props }) {

    function handleListIconOnLCick(event) {
        const sidebar = document.querySelector(".sidebar");
        sidebar.classList.toggle("active-sidebar");
    }

    return (
        <div className="sidebar">
            <div
                className="sidebar__header"
                onClick={handleListIconOnLCick}
            >
                <i className="material-icons">
                    chevron_right
                </i>
                <p>Dashboard</p>
            </div>
            {props.children}
        </div>
    );
}

export default Sidebar;