import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai"
import "../assets/css/askConfirmBox.css";

function AskConfirmBox({ message, setSelectedResult }) {
    function handleConfirm() {
        hideBox();
        setTimeout(() => {
            setSelectedResult(true);
        }, 400);
    }

    function handleCancel() {
        hideBox();
        setTimeout(() => {
            setSelectedResult(false);
        }, 400);
    }

    function hideBox() {
        const box = document.querySelector(".ask-confirm-box");
        box.classList.remove("active-ask-confirm-box");
    }

    useEffect(() => {
        const bookingRequestBox = document.querySelector(".ask-confirm-box");
        bookingRequestBox.classList.add("active-ask-confirm-box");
        bookingRequestBox.focus();
        return () => {
            bookingRequestBox.classList.remove("active-ask-confirm-box");
        }
    }, [])

    return (
        <div className="ask-confirm-box" tabIndex="0">
            <div className="confirm-box" tabIndex="0">
                <div className="confirm-box__header">
                    <AiOutlineClose
                        className="confirm-box__header__close-icon"
                        onClick={handleCancel}
                    />
                </div>
                <div className="confirm-box__content">
                    <p className="confirm-box__message">{message}</p>
                    <div className="confirm-box__options">
                        <div
                            className="confirm-box__confirm"
                            onClick={handleConfirm}
                        >
                            Confirm
                        </div>
                        <div
                            className="confirm-box__cancel"
                            onClick={handleCancel}
                        >
                            Cancel
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AskConfirmBox;