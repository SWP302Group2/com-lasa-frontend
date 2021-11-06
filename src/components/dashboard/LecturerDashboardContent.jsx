import { Redirect, Route, Switch } from "react-router-dom";
import LecturerDashboardSchedule from "./LecturerDashboardSchedule";
import LecturerDashboardSlot from "./LecturerDashboardSlot";

function LecturerDashboardContent() {
    return (
        <Switch>
            <Route
                exact path="/dashboard"
                component={LecturerDashboardSchedule}
            />
            <Route
                exact path="/dashboard/schedule"
                component={LecturerDashboardSchedule}
            />
            <Route
                exact path="/dashboard/slots"
                component={LecturerDashboardSlot}
            />
            <Route
                exact path="/dashboard/notifications"
            />
            <Redirect to="/page-not-found" />
        </Switch>
    );
}

export default LecturerDashboardContent;