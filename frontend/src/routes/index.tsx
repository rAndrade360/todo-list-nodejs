import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";
import Route from './Route';
import Register from "../pages/Register";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import General from "../pages/General";

export default function Routes() {
  return (
    <Router>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/login" />
          </Route>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login}/>
          <Route path="/dashboard" exact isPrivate component={Dashboard} />
          <Route path="/dashboard/general" isPrivate component={General} />
        </Switch>
    </Router>
  );
}