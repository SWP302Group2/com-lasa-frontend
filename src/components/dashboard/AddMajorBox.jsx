import { useEffect, useState } from "react";
import "../../assets/css/createSlotBox.css";
import { AiOutlineClose } from "react-icons/ai";
import ActionResultMessage from "../search-page/ActionResultMessage";
import "../../assets/css/addMajorBox.css"
import ErrorMessage from "../ErrorMessage";
import Loader from "../Loader";
import majorApi from "../../api/majorApi";


function AddMajorBox({ closeCallback, refreshCallback }) {
    const [majorCode, setMajorCode] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [errorMessage, setErrorMessage] = useState({});
    const [isLoading, setIsLoading] = useState(false)

    const [{ status, message }, setAddMajorResult] = useState({ status: null, message: null });
    const [isCreating, setIsCreating] = useState(false);

    function handleAddBoxOnKeyDown(event) {
        if (event.key !== "Escape") return;
        handleCloseAddBox();
    }

    function handleCreateSlotSubmit(event) {
        event.preventDefault();
        let error = false;

        if (!checkValidMajorCode(majorCode)) {
            error = true;
        }

        if (error) return;

        setIsCreating(true);
    }

    function checkValidMajorCode(majorCode) {
        if (!majorCode || majorCode.trim().length <= 0) {
            setErrorMessage({ mushHasMajorCode: "Major code cannot be empty or all whitespace" });
            return false;
        }

        return true;
    }

    function handleCloseAddBox() {
        const addBox = document.querySelector(".add-major-box");
        addBox?.classList.remove("active-add-major-box");

        setTimeout(() => {
            if (closeCallback) closeCallback();
        }, 300);
    }

    function handleCloseResultMessage() {
        setAddMajorResult({ status: null, message: "" });
        if (status !== true) return;
        handleCloseAddBox();
    }

    function handleMajorCodeOnChange(event) {
        const value = event.target?.value || "";
        setMajorCode(value);
    }

    function handleNameOnChange(event) {
        const value = event.target?.value || "";
        setName(value);
    }

    function handleDescriptionOnChange(event) {
        const value = event.target?.value || "";
        setDescription(value);
    }

    useEffect(function activeBox() {
        const AddBox = document.querySelector(".add-major-box");
        AddBox?.classList.add("active-add-major-box");
        AddBox?.focus();

        return () => {
            AddBox?.classList.remove("active-add-major-box");
        }
    }, []);

    useEffect(function callApiAddNewMajor() {
        if (!isCreating) return;
        setIsLoading(true);
        setIsCreating(false);
        callAddNewMajor();

        function callAddNewMajor() {
            const onAddSuccess = (data) => {
                console.log("Dashboard add new major success:");
                console.log(data);

                setIsLoading(false);
                setAddMajorResult({ status: true, message: "Add new major success." })
            }

            const onAddFailure = (response, status, message) => {
                console.error("Dashboard add new major failed:");
                console.error(response);

                setIsLoading(false);
                setAddMajorResult({ status: false, message: "Add new major false with unknown error." })
            }

            majorApi.addNewMajor(onAddSuccess, onAddFailure,
                majorCode.trim(), name.trim(), description.trim()
            );
        }

    }, [isCreating, name, majorCode, description])

    return (
        <div
            className="add-major-box"
            onKeyDown={handleAddBoxOnKeyDown}
            tabIndex="0"
        >
            <form
                className="box"
                onSubmit={handleCreateSlotSubmit}
            >
                {isLoading && <Loader />}

                <div className="box__header">
                    <h2 className="box__header__title">
                        Create Major
                    </h2>
                    <AiOutlineClose
                        className="box__header__close-icon"
                        onClick={handleCloseAddBox}
                    />
                </div>

                <div className="box__content">
                    <div className="box__major-code">
                        <p className="box__title">Major Code</p>
                        <div className="box__control">
                            <input
                                type="text"
                                value={majorCode}
                                onChange={handleMajorCodeOnChange}
                            />
                        </div>
                    </div>
                    {errorMessage.mushHasMajorCode && <ErrorMessage message={errorMessage.mushHasMajorCode} />}

                    <div className="box__name">
                        <p className="box__title">Name</p>
                        <div className="box__control">
                            <input
                                type="text"
                                value={name}
                                onChange={handleNameOnChange}
                            />
                        </div>
                    </div>
                    <div className="box__description">
                        <p className="box__title">Description</p>
                        <div className="box__control">
                            <input
                                type="text"
                                value={description}
                                onChange={handleDescriptionOnChange}
                            />
                        </div>
                    </div>
                </div>

                {status != null &&
                    <ActionResultMessage
                        status={status}
                        message={message}
                        closeCallBack={handleCloseResultMessage}
                    />
                }

                <div className="box__bottom">
                    <button
                        className="box__bottom__add"
                        type="submit"
                    >
                        Add
                    </button>
                    <p
                        className="box__bottom__close"
                        tabIndex="0"
                        onClick={handleCloseAddBox}
                    >
                        Close
                    </p>
                </div>
            </form>
        </div>
    );
}

export default AddMajorBox;