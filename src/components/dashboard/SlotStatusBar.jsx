import {
    SLOT_STATUS_CANCELED,
    SLOT_STATUS_DELETED,
    SLOT_STATUS_FINISHED,
    SLOT_STATUS_NOTIFIED,
    SLOT_STATUS_READY,
    SLOT_STATUS_WAITING
} from "../../utils/constant";

function SlotStatusBar({ status }) {

    return (
        <div className="status-bar">
            {status != null && status === SLOT_STATUS_WAITING &&
                <p className="status-bar__button status-bar__button--waiting">
                    Pending
                </p>
            }
            {status != null && status === SLOT_STATUS_READY &&
                <p className="status-bar__button status-bar__button--ready">
                    Ready
                </p>
            }
            {status != null && status === SLOT_STATUS_CANCELED &&
                <p className="status-bar__button status-bar__button--canceled">
                    Canceled
                </p>
            }
            {status != null && status === SLOT_STATUS_FINISHED &&
                <p className="status-bar__button status-bar__button--finished">
                    Finished
                </p>
            }
            {status != null && status === SLOT_STATUS_NOTIFIED &&
                <p className="status-bar__button status-bar__button--ready">
                    Ready
                </p>
            }
            {status != null && status === SLOT_STATUS_DELETED &&
                <p className="status-bar__button status-bar__button--removed">
                    Removed
                </p>
            }
        </div>
    );
}

export default SlotStatusBar;