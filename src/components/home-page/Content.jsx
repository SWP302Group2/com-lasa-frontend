import { Link } from "react-router-dom";

function Content() {
    return (
        <div className="content">
            <h2 className="content__headline">Welcome to</h2>
            <h2 className="content__appname">Lecturer Appointment Schedule Application</h2>
            <Link className="content__button" to="/sign-in">
                Go search now!
            </Link>
        </div>

    );
}

export default Content;