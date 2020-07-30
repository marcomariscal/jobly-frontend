import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Home from "./Home";
import Companies from "./Companies";
import Company from "./Company";
import Jobs from "./Jobs";
import Login from "./Login";
import Profile from "./Profile";

const Routes = ({
  tokenToStorage,
  getCurrentUser,
  currentUser,
  usernameToStorage,
}) => {
  const renderCompany = (props) => {
    const { handle } = props.match.params;
    return <Company handle={handle} currentUser={currentUser} />;
  };

  return (
    <div>
      <Switch>
        <Route exact path="/login">
          <Login
            tokenToStorage={tokenToStorage}
            getCurrentUser={getCurrentUser}
            usernameToStorage={usernameToStorage}
          />
        </Route>
        <Route exact path="/">
          <Home currentUser={currentUser} />
        </Route>
        <Route exact path="/companies">
          <Companies currentUser={currentUser} />
        </Route>
        <Route exact path="/jobs">
          <Jobs currentUser={currentUser} />
        </Route>
        <Route exact path="/companies/:handle" render={renderCompany} />
        <Route exact path="/profile">
          <Profile currentUser={currentUser} />
        </Route>
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default Routes;
