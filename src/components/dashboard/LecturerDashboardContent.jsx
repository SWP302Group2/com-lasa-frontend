import { Redirect, Route, Switch } from "react-router-dom";
import LecturerDashboardSchedule from "./LecturerDashboardSchedule";

function LecturerDashboardContent() {
  return (
    <Switch>
      <Route exact path="/dashboard" component={LecturerDashboardSchedule} />
      <Route
        exact
        path="/dashboard/schedule"
        component={LecturerDashboardSchedule}
      />
      <Route exact path="/dashboard/notifications" />
      <Redirect to="/page-not-found" />
    </Switch>
  );
}

export default LecturerDashboardContent;
