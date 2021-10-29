
import { useEffect } from "react";

function SlotList({ ...props }) {

    useEffect(() => {
        const list = document.querySelectorAll(".slot-list .slot");
        list.forEach(addAnimationToSlot)

        function addAnimationToSlot(item, index) {
            item.style.animation = `search-content-slot-fadein 300ms ease-in forwards ${index / 10 + 0.1}s`;
        }

        function removeAnimationInSlot(item, index) {
            item.style.animation = null;
        }

        return () => {
            list.forEach(removeAnimationInSlot);
        };
    })

    return (
        <div className="slot-list">
            {props.children}
        </div>
    );
}

export default SlotList;