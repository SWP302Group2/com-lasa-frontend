import "../assets/css/errorMessage.css";

function ErrorMessage({ message }) {
    return (
        <div id="error-message">
            <div className="message-content">{message}</div>
        </div>
    );
}

export default ErrorMessage;