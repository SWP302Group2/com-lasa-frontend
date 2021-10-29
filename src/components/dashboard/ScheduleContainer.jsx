import { ViewState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    DayView,
    WeekView,
    Toolbar,
    ViewSwitcher,
    MonthView,
} from '@devexpress/dx-react-scheduler-material-ui';
import { Appointments } from '@devexpress/dx-react-scheduler';

function ScheduleContainer() {
    return (
        <div className="schedule-container">
            <Scheduler
                // data={null}
                height={400}
            >
                <ViewState
                    defaultCurrentDate={new Date().toISOString()}
                    defaultCurrentViewName="Week"
                />

                <DayView />
                <WeekView />
                <MonthView />
                <Toolbar />
                <ViewSwitcher />
                <Appointments />
            </Scheduler>
        </div>
    );
}

export default ScheduleContainer;