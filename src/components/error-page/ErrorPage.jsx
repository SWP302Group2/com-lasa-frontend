import { useLocation, Link } from "react-router-dom";

function ErrorPage() {
    const location = useLocation();
    const message = location?.state.message;
    console.log(message)
    return (
        <div className="error">
            <div className="error__title">
                ERROR
            </div>
            <div className="error__content">
                {message}
            </div>
            <Link to="/home">Back to home page!</Link>
        </div>
    );
}

export default ErrorPage;