import { AiOutlineClose, AiOutlineWarning } from "react-icons/ai";
import { MdOutlineDone } from "react-icons/md";
import "../../assets/css/actionResultMessage.css";
import { useEffect } from "react";


function ActionResultMessage({ status, message, closeCallBack }) {

    function handleClosePopupOnClick() {
        closeCallBack();
    }

    useEffect(activeBox, []);

    function activeBox() {
        const resultBox = document.querySelector(".action-result-message-box");
        resultBox.classList.add("active-action-result-message-box");

        return () => {
            resultBox.classList.remove("active-action-result-message-box");
        }
    }

    return (
        <div className="action-result-message-box">
            <div className="box">
                <div className="box__header">
                    <AiOutlineClose
                        className="box__header__close-icon"
                        onClick={handleClosePopupOnClick}
                    />
                </div>
                <div className="box__content">
                    {status === true &&
                        <div className="box__content__message-successful">
                            <MdOutlineDone className="box__content__message-successful__icon" />
                            <p>{message}</p>
                        </div>
                    }
                    {status === false &&
                        <div className="box__content__message-failed">
                            <AiOutlineWarning className="box__content__icon" />
                            <p>{message}</p>
                        </div>
                    }
                </div>
                <div className="box__bottom">
                    {status === true &&
                        <div
                            className="box__bottom__ok box__bottom__ok--successful"
                            onClick={handleClosePopupOnClick}
                        >
                            Ok
                        </div>
                    }
                    {status === false &&
                        <div
                            className="box__bottom__ok box__bottom__ok--failed"
                            onClick={handleClosePopupOnClick}
                        >
                            Ok
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default ActionResultMessage;