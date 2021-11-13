import { Redirect, Route, Switch } from "react-router-dom";
import LecturerDashboardSchedule from "./LecturerDashboardSchedule";
import LecturerDashBoardNotification from "./LecturerDashBoardNotification";

function LecturerDashboardContent() {
  return (
    <Switch>
      <Route exact path="/dashboard" component={LecturerDashboardSchedule} />
      <Route
        exact
        path="/dashboard/schedule"
        component={LecturerDashboardSchedule}
      />
      <Route
        exact
        path="/dashboard/notifications"
        component={LecturerDashBoardNotification}
      />
      <Redirect to="/page-not-found" />
    </Switch>
  );
}

export default LecturerDashboardContent;
