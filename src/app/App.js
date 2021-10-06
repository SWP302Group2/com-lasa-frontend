import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "../custome-library/gridLibrary.css";
import "./App.css";
import PageNotFound from "../pages/error-pages/components/PageNotFound";
import AuthPage from "../pages/auth-page/components/AuthPage";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact path="/"
          component={AuthPage} />
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
