import { AiOutlineClose } from "react-icons/ai"
import "../assets/css/askConfirmBox.css";
function AskConfirmBox({ message, setSelectedResult }) {
    function handleConfirm() {
        setSelectedResult(true);
    }

    function handleCancel() {
        setSelectedResult(false);
    }

    console.log(message);

    return (
        <div className="ask-confirm-box">
            <AiOutlineClose
                className="ask-confirm-box__icon-close"
                onClick={handleCancel}
            />
            <p className="ask-confirm-box__message">{message}</p>
            <div className="ask-confirm-box__buttons">
                <div
                    className="ask-confirm-box__confirm"
                    onClick={handleConfirm}
                >Confirm
                </div>
                <div
                    className="ask-confirm-box__cancel"
                    onClick={handleCancel}
                >
                    Cancel</div>
            </div>
        </div>
    );
}

export default AskConfirmBox;