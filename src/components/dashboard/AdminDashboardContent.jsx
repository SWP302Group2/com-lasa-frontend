import { Redirect, Route, Switch } from "react-router-dom";
import AdminDashboardBooking from "./AdminDashboardBooking";
import AdminDashboardLecturer from "./AdminDashboardLecturer";
import AdminDashboardMajorAndTopic from "./AdminDashboardMajorAndTopic";
import AdminDashboardOverview from "./AdminDashboardOverview";
import AdminDashboardSlot from "./AdminDashboardSlot";
import AdminDashboardStudent from "./AdminDashboardStudent";

function AdminDashboardContent() {
    return (
        <Switch>
            <Route
                exact path="/dashboard"
                component={AdminDashboardOverview}
            />
            <Route
                exact path="/dashboard/students"
                component={AdminDashboardStudent}
            />
            <Route
                exact path="/dashboard/lecturers"
                component={AdminDashboardLecturer}
            />
            <Route
                exact path="/dashboard/slots"
                component={AdminDashboardSlot}
            />
            <Route
                exact path="/dashboard/booking-requests"
                component={AdminDashboardBooking}
            />
            <Route
                exact path="/dashboard/majors-topics"
                component={AdminDashboardMajorAndTopic}
            />
            <Redirect to="/page-not-found" />
        </Switch>
    );
}

export default AdminDashboardContent;