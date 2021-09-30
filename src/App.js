import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import PathNotFound from './components/PathNotFound';
import SignInPage from './components/signin-page/SignInPage';

function App() {
  return (
    <Router>
      <React.Fragment>
        <Switch>
          <Route exact path="/" />
          <Route exact path={"/sign-in"} component={SignInPage} />
          <Route exact path={"/file-not-found"} component={PathNotFound} />
          <Redirect to={"/file-not-found"} />
        </Switch>
      </React.Fragment>
    </Router>
  );
}

export default App;
