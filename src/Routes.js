import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import Home from "./Home";
import Companies from "./Companies";
import Company from "./Company";
import Jobs from "./Jobs";
import Login from "./Login";
import Profile from "./Profile";

const Routes = ({ setToken }) => {
  return (
    <div className="pt-5">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login setToken={setToken} />
        </Route>
        <PrivateRoute exact path="/companies">
          <Companies />
        </PrivateRoute>
        <PrivateRoute exact path="/jobs">
          <Jobs />
        </PrivateRoute>
        <PrivateRoute exact path="/companies/:handle">
          <Company />
        </PrivateRoute>
        <PrivateRoute exact path="/profile">
          <Profile />
        </PrivateRoute>
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default Routes;
