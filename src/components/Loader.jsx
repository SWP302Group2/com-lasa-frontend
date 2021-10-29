
import "../assets/css/loader.css";

function Loader({ message }) {
    return (
        <div className="loader">
            <div className="loader__content">
                <div className="loader__circle"></div>
                <p className="loader__message">{message}</p>
            </div>
        </div>
    );
}

export default Loader;