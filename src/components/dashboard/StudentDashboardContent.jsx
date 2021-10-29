import { Redirect, Route, Switch } from "react-router-dom";
import StudentDashboardBookingRequest from "./StudentDashboardBookingRequest";
import StudentDashboardNotification from "./StudentDashboardNotification";

function StudentDashboardContent() {
    return (
        <Switch>
            <Route
                exact path="/dashboard"
                component={StudentDashboardBookingRequest}
            />
            <Route
                exact path="/dashboard/booking-requests"
                component={StudentDashboardBookingRequest}
            />
            <Route
                exact path="/dashboard/notifications"
                component={StudentDashboardNotification}
            />
            <Redirect to="/page-not-found" />
        </Switch>
    );
}

export default StudentDashboardContent;