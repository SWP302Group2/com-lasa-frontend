import "../../../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-calendars/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-lists/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-react-schedule/styles/material.css";
import { ScheduleComponent, Day, Week, Month, Inject, ViewsDirective, ViewDirective } from '@syncfusion/ej2-react-schedule';
import { useEffect, useState } from "react";
import { SLOT_STATUS_DELETED } from "../../utils/constant";
import CreateSlotBox from "./CreateSlotBox";
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';

import { L10n } from '@syncfusion/ej2-base';
import { useDispatch, useSelector } from "react-redux";
import { newSlot } from "../../redux/actions/slot";
import EditSlotBox from "./EditSlotBox";
import lecturerStatusList from "../../data/lecturerStatusList";
import SlotControlBox from "./SlotControlBox";
import ViewRequestBox from "./ViewRequestBox";

L10n.load({
    'en-US': {
        'schedule': {
            'saveButton': '',
            'cancelButton': '',
            'deleteButton': '',
            'newEvent': '',
            'editEvent': '',
        },
    }
});

const fields = {
    id: 'Id',
    subject: { name: 'Subject', title: 'Status' },
    location: { name: 'Location', title: 'Meeting url' },
    description: { name: 'Description', title: 'None' },
    startTime: { name: 'StartTime', title: 'Start Meeting' },
    endTime: { name: 'EndTime', title: 'End Meeting' }
}


function SchedulerArea({ slots, refreshCallback }) {
    const [createSlot, setCreateSlot] = useState(false);
    const [editSlot, setEditSlot] = useState(false);
    const [dataSource, setDatasource] = useState([]);
    const [slotControl, setSlotControl] = useState(false);
    const [viewRequest, setViewRequest] = useState(false);

    const meetingUrl = useSelector(state => state.user.meetingUrl);
    const dispatch = useDispatch();


    useEffect(formatSlotsToData, [slots, meetingUrl]);

    function formatSlotsToData() {
        if (!Array.isArray(slots)) return;
        if (slots.length < 0) return;  //It not invalid, just nothing to display

        const preparingData =
            [...slots]
                .filter(slot => slot.status !== SLOT_STATUS_DELETED)
                .map(slot => {
                    const Id = slot.id;
                    const StartTime = new Date(slot.timeStart) || new Date();
                    const EndTime = new Date(slot.timeEnd) || new Date();
                    const status = slot.status;
                    const topics = slot.topics;
                    const Subject = lecturerStatusList.find(item => item.value === slot.status).name;
                    const record = {
                        Id, StartTime, EndTime, Subject, status, topics, Location: meetingUrl
                    }
                    return record;
                });

        console.log("Datasource: ");
        console.log(preparingData);
        setDatasource(preparingData);
    }

    function handleCreateButtonOnClick(event) {
        setCreateSlot(true);
    }

    function handlePopupOpen(args) {
        args.cancel = true;
        const target = args?.target;
        const data = args?.data;
        if (!target) return;
        if (!data) return;

        if (target?.classList.contains("e-work-cells")) {
            dispatch(newSlot({
                timeStart: data.StartTime,
                timeEnd: data.EndTime,
            }))
            setCreateSlot(true);
            return;
        }
        if (target?.classList.contains("e-appointment")) {
            dispatch(newSlot({
                timeStart: data.StartTime,
                timeEnd: data.EndTime,
                status: data.status,
                selectedTopics: data.topics,
                id: data.Id
            }))
            setSlotControl(true);
        }
    }

    return (
        <div className="schedule-area">
            <ButtonComponent
                onClick={handleCreateButtonOnClick}
            >Create</ButtonComponent>

            {createSlot &&
                <CreateSlotBox
                    setCreateSlot={setCreateSlot}
                    refreshCallback={refreshCallback}
                />
            }

            {slotControl &&
                <SlotControlBox
                    setSlotControl={setSlotControl}
                    setEditSlot={setEditSlot}
                    setViewRequest={setViewRequest}
                />
            }

            {editSlot &&
                <EditSlotBox
                    setEditSlot={setEditSlot}
                    refreshCallback={refreshCallback}
                />
            }

            {viewRequest &&
                <ViewRequestBox
                    setViewRequest={setViewRequest}
                    refreshCallback={refreshCallback}
                />
            }

            <ScheduleComponent
                height="500px"
                width='100%'
                currentView='Week'
                showQuickInfo={false}
                eventSettings={{ dataSource: dataSource, editFollowingEvents: true, fields: fields }}
                popupOpen={handlePopupOpen}
            >
                <ViewsDirective>
                    <ViewDirective option='Day' />
                    <ViewDirective option='Week' />
                    <ViewDirective option='Month' />
                </ViewsDirective>
                <Inject services={[Day, Week, Month]} />
            </ScheduleComponent>
        </div>
    );
}

export default SchedulerArea;