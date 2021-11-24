import { useEffect, useState } from "react";
import SlotItem from "./SlotItem";

function SlotList({ matchedSlots, openCreateBookingRequest }) {
    const [sameDateSlotsList, setSameDateSlotsList] = useState({});

    useEffect(function addAnimationToSlot() {
        const list = document.querySelectorAll(".slot-list .slot");
        list.forEach(addAnimationToSlot)

        function addAnimationToSlot(item, index) {
            item.style.animation = `search-content-slot-faded 300ms ease-in forwards ${index / 10 + 0.1}s`;
        }

        function removeAnimationInSlot(item, index) {
            item.style.animation = null;
        }

        return () => {
            list.forEach(removeAnimationInSlot);
        };
    })

    useEffect(function separateSlotOnDay() {
        if (!Array.isArray(matchedSlots) || matchedSlots.length <= 0) return;
        const newSameDateSlotsList = {};
        const isExistSlotInList = (slotList, slot) => {
            return Array.isArray(slotList) && slotList.find(dateSlot => dateSlot.id === slot.id);
        }

        matchedSlots.forEach(slot => {
            const date = slot.timeStart?.getDateSlotTemplate() || slot.timeEnd?.getDateSlotTemplate();
            if (newSameDateSlotsList[date] == null) {
                newSameDateSlotsList[date] = [];
            }

            if (!isExistSlotInList(newSameDateSlotsList[date], slot)) {
                newSameDateSlotsList[date].push(slot);
            }
        })

        setSameDateSlotsList({ ...newSameDateSlotsList });
    }, [matchedSlots])

    // <div className="slot__datetime__date">{slot.timeStart.getDateString()}</div>
    return (
        <div className="slot-list">
            {sameDateSlotsList && Object.keys(sameDateSlotsList).length > 0 &&
                Object.keys(sameDateSlotsList).map(dateKey =>
                    <div
                        className="slot-list__date"
                        key={`day_${dateKey}`}
                    >
                        <div className="slot-list__date__time">{dateKey || ""}</div>
                        <div className="slot-list__date__items">
                            {sameDateSlotsList[dateKey].map(slot =>
                                <SlotItem
                                    slot={slot}
                                    key={"slot__" + slot.id}
                                    openCreateBookingRequest={openCreateBookingRequest}
                                />
                            )}
                        </div>
                    </div>

                )
            }

        </div>
    );
}

export default SlotList;