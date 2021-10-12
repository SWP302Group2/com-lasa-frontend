import { useLocation } from "react-router";

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
        </div>
    );
}

export default ErrorPage;