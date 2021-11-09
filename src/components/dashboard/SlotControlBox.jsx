import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "../../assets/css/slotControlBox.css";


function SlotControlBox({ setSlotControl, setEditSlot, setViewRequest }) {

    function handleCloseSlotControl() {
        const slotControlBox = document.querySelector(".slot-control-box");
        slotControlBox?.classList.remove("active-slot-control-box");

        setTimeout(() => {
            if (setSlotControl) setSlotControl(false);
        }, 300)
    }

    function handleSlotControlOnKeyDown(event) {
        if (event.key !== "Escape") return;
        handleCloseSlotControl();
    }

    function handleEditButtonOnClick() {
        setEditSlot(true);
    }

    function handleViewRequestButtonOnClick() {
        setViewRequest(true);
    }

    useEffect(activeSlotControlBox, []);


    function activeSlotControlBox() {
        const slotControlBox = document.querySelector(".slot-control-box");
        slotControlBox?.classList.add("active-slot-control-box");
        slotControlBox?.focus();

        return () => {
            slotControlBox?.classList.remove("active-slot-control-box");
        }
    }

    return (
        <div
            tabIndex="0"
            className="slot-control-box"
            onKeyDown={handleSlotControlOnKeyDown}
        >
            <div className="box">
                <div className="box__header">
                    <h2 className="box__header__title">Panel</h2>
                    <AiOutlineClose
                        className="box__header__close-icon"
                        onClick={handleCloseSlotControl}
                    />
                </div>
                <div className="box__panel">
                    <p
                        className="box__panel__edit"
                        onClick={handleEditButtonOnClick}
                    >
                        Edit
                    </p>
                    <p
                        className="box__panel__view-request"
                        onClick={handleViewRequestButtonOnClick}
                    >
                        View Request
                    </p>
                </div>
                <div className="box__bottom">
                    <p
                        className="box__bottom__close"
                        tabIndex="0"
                        onClick={handleCloseSlotControl}
                    >
                        Close
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SlotControlBox;