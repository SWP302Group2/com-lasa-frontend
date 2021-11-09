import { useEffect } from "react";
import "../../assets/css/bottomErrorMessage.css";

function BottomErrorMessage({ message, closeCallback }) {

    useEffect(handleCloseMessage, [closeCallback]);

    function handleCloseMessage() {
        let mounted = true;
        let countTimeToClose = setTimeout(closeMessage, 1000 * 10);

        function closeMessage() {
            if (!mounted) return;
            closeCallback();
        }

        return () => {
            mounted = false;
            clearTimeout(countTimeToClose);
        }
    }

    return (
        <div className="bottom-error-message">
            <p className="bottom-error-message__content">
                {message}
            </p>
        </div>
    );
}

export default BottomErrorMessage;