import { Link } from "react-router-dom";

function Menu() {

    return (
        <section className="menu hidden">
            <div className="menu__burger">
                <div className="line-1"></div>
                <div className="line-2"></div>
                <div className="line-3"></div>
            </div>
            <ul className="menu__nav">
                <li className="menu__navItem active">
                    <Link to="/home">
                        Home
                    </Link>
                </li>
                <li className="menu__navItem">
                    <Link to="/home">
                        Search
                    </Link>
                </li>
                <li className="menu__navItem">
                    <Link to="/home">
                        Schedule
                    </Link>
                </li>
                <li className="menu__navItem">
                    <Link to="/home">
                        Dashboard
                    </Link>
                </li>
                <li className="menu__navItem">
                    <Link to="/home">
                        More
                        <i className="material-icons">expand_more</i>
                    </Link>
                </li>
            </ul>
        </section>
    );
}

export default Menu;