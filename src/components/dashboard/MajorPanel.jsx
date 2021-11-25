import { useState } from "react";
import { GrAdd } from "react-icons/gr";
import "../../assets/css/majorPanel.css";
import AddMajorBox from "./AddMajorBox";

function MajorPanel() {
    const [isAddingMajor, setIsAddingMajor] = useState(false);


    function handleAddMajorOnClick() {
        setIsAddingMajor(true);
    }

    function closeAddingMajorBox() {
        setIsAddingMajor(false);
    }


    return (
        <div className="major-panel">
            <div className="major-panel__top">
                <div
                    className="create-button"
                    onClick={handleAddMajorOnClick}
                >
                    <p className="create-button__text">
                        Add
                    </p>
                    <GrAdd className="create-button__icon" />
                </div>
            </div>
            {isAddingMajor &&
                <AddMajorBox
                    closeCallback={closeAddingMajorBox}
                />
            }

            <div className="major-panel__header">
                <p className="major-panel__header__th ">Major</p>
                <p className="major-panel__header__th ">Name</p>
                <p className="major-panel__header__th ">Description</p>
                <p className="major-panel__header__th major-panel__header__action">Action</p>
                <p className="major-panel__header__th major-panel__header__more">Topics</p>
            </div>

        </div>
    );
}

export default MajorPanel;