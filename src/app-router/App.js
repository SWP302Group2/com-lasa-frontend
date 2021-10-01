import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import PathNotFound from "../components/error-pages/PathNotFound";
import SignInPage from "../components/signin-page/SignInPage";
import "./App.css";

function App() {
  return (
    <Router>
      <React.Fragment>
        <Switch>
          <Route
            exact path="/"
            component={SignInPage} />
          <Route
            exact path="/sign-in"
            component={SignInPage} />
          <Route
            exact path="/page-not-found"
            component={PathNotFound} />

          <Redirect to={"/page-not-found"} />
        </Switch>
      </React.Fragment>
    </Router>
  );
}

export default App;
