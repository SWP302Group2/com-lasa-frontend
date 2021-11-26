import { USER_STATUS_ACTIVE, USER_STATUS_BANNED, USER_STATUS_INACTIVE } from "../../utils/constant";

function UserStatusRadio({ status, newStatus, setNewStatus }) {

    function handleChangeStatus(event) {
        const value = event.target?.value;
        if (value == null) return;
        if (!(/^[-]?\d$/.test(value))) return;
        if (setNewStatus) {
            setNewStatus(Number.parseInt(value));
        }
    }

    return (
        <div className="box__status">
            <div className="box__title">
                Status
            </div>
            <div className="box__control">
                <div className="box__radio">
                    <input
                        type="radio"
                        name="status"
                        id="box-radio-circle-active"
                        value={USER_STATUS_ACTIVE}
                        onChange={handleChangeStatus}
                        defaultChecked={newStatus === USER_STATUS_ACTIVE}
                    />
                    <label htmlFor="box-radio-circle-active">
                        <div className="outer-circle"></div>
                        Active
                    </label>
                </div>
                <div className="box__radio">
                    <input
                        type="radio"
                        name="status"
                        id="box-radio-circle-banned"
                        value={USER_STATUS_BANNED}
                        onChange={handleChangeStatus}
                        defaultChecked={newStatus === USER_STATUS_BANNED}
                    />
                    <label htmlFor="box-radio-circle-banned">
                        <div className="outer-circle"></div>
                        Ban
                    </label>
                </div>
                {status != null && status === USER_STATUS_INACTIVE &&
                    <div className="box__radio">
                        <input
                            type="radio"
                            name="status"
                            id="box-radio-circle-inactive"
                            value={USER_STATUS_INACTIVE}
                            onChange={handleChangeStatus}
                            defaultChecked={newStatus === USER_STATUS_INACTIVE}
                        />
                        <label htmlFor="box-radio-circle-inactive">
                            <div className="outer-circle"></div>
                            Inactive
                        </label>
                    </div>
                }
            </div>
        </div>
    );
}

export default UserStatusRadio;