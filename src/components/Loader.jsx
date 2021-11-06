
import "../assets/css/loader.css";

function Loader({ message }) {
    return (
        <div className="loader-loading">
            <div className="loader-loading__content">
                <div className="loader-loading__circle"></div>
                <p className="loader-loading__message">{message}</p>
            </div>
        </div>
    );
}

export default Loader;