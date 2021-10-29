import "../assets/css/successfulMessage.css";

function SuccessfulMessage({ message }) {
    return (
        <div id="successful-message">
            <div className="message-content">{message}</div>
        </div>
    );
}

export default SuccessfulMessage;