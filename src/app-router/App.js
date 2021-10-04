import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import SignInPage from "../components/signin-page/SignInPage";
import HomePage from "../components/home-page/HomePage";
import PathNotFound from "../components/error-pages/PathNotFound";
import "../grid-system/gridLibrary.css";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact path="/"
          component={HomePage} />
        <Route
          exact path="/sign-in"
          component={SignInPage} />
        <Route
          exact path="/home"
          component={HomePage} />
        <Route
          exact path="/page-not-found"
          component={PathNotFound} />

        <Redirect to={"/page-not-found"} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
