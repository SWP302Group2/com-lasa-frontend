import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import "../../assets/css/slotControlBox.css";
import slotStatusList from "../../data/slotStatusList";


function SlotControlBox({ setSlotControl, setEditSlot, setViewRequest }) {

    const slotInfo = useSelector(state => state.slot);

    function handleSlotControlBoxOnClick(event) {
        if (isClickOnBox(event.target)) return;
        handleCloseSlotControl();
    }

    function isClickOnBox(target) {
        const box = document.querySelector(".slot-control-box .box");
        return box?.contains(target);
    }

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
        slotControlBox?.querySelector(".box__header__edit")?.focus();

        return () => {
            slotControlBox?.classList.remove("active-slot-control-box");
        }
    }

    return (
        <div
            tabIndex="0"
            className="slot-control-box"
            onClick={handleSlotControlBoxOnClick}
            onKeyDown={handleSlotControlOnKeyDown}
        >
            <div className="box">
                <div className="box__header">
                    <div className="box__header__title">
                        {slotStatusList.find(item => item.value === slotInfo.status)?.name}
                    </div>
                    <div className="box__header__icon">
                        <MdModeEdit
                            title="Edit"
                            tabIndex="0"
                            className="box__header__edit"
                            onClick={handleEditButtonOnClick}
                        />
                        <AiOutlineClose
                            title="Close"
                            tabIndex="0"
                            className="box__header__close"
                            onClick={handleCloseSlotControl}
                        />
                    </div>
                </div>
                <div className="box__info">
                    <p className="box__info__time">
                        {`${slotInfo.timeStart.toDateString()} (${slotInfo.timeStart.toLocaleTimeString()} to ${slotInfo.timeEnd.toLocaleTimeString()})`}
                    </p>
                    <p
                        className="box__info__view-request"
                        onClick={handleViewRequestButtonOnClick}
                    >
                        View requests &#10095;
                    </p>
                </div>

            </div>
        </div>
    );
}

export default SlotControlBox;