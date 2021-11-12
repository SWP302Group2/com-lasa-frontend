import { AiOutlineRight } from "react-icons/ai";

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
                <i>
                    <AiOutlineRight className="sidebar__header__icon" />
                </i>
                <p className="sidebar__header__label">Dashboard</p>
            </div>
            {props.children}
        </div>
    );
}

export default Sidebar;