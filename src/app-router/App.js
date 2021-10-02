import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import PathNotFound from "../components/error-pages/PathNotFound";
import MainPage from "../components/main-page/MainPage";
import SignInPage from "../components/signin-page/SignInPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Switch>
          <Route
            exact path="/"
            component={SignInPage} />
          <Route
            exact path="/sign-in"
            component={SignInPage} />
          <Route
            exact path="/home"
            component={MainPage} />
          <Route
            exact path="/page-not-found"
            component={PathNotFound} />

          <Redirect to={"/page-not-found"} />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
