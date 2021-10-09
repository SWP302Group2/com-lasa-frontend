import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "../assets/css/App.css";
import PageNotFound from "../components/PageNotFound";
import HomePage from "../components/home-page/HomePage";
import AuthPage from "../components/auth-page/AuthPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/home">
          <HomePage />
        </Route>
        <Route
          path="/auth"
          component={AuthPage} />
        <Route
          exact path="/page-not-found"
          component={PageNotFound} />

        <Redirect to={"/page-not-found"} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
