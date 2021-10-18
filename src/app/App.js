import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "../assets/css/App.css";
import PageNotFound from "../components/PageNotFound";
import HomePage from "../components/home-page/HomePage";
import AuthPage from "../components/auth-page/AuthPage";
import ErrorPage from "../components/error-page/ErrorPage";
import SignOutRoute from "../utils/SignOutRoute";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact path="/"
          component={HomePage}
        />
        <Route
          exact path="/home"
          component={HomePage}
        />
        <Route
          exact path="/welcome"
          component={HomePage}
        />
        <Route
          exact path="/search"
          component={HomePage}
        />
        <Route
          path="/auth"
          component={AuthPage}
        />
        <Route
          exact path="/sign-out"
          component={SignOutRoute}
        />
        <Route
          exact path="/error"
          component={ErrorPage}
        />
        <Route
          exact path="/page-not-found"
          component={PageNotFound}
        />

        <Redirect to={"/page-not-found"} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
