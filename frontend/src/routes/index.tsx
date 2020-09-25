import React from "react";
import {
  Switch,
  Redirect
} from "react-router-dom";
import Route from './Route';
import Register from "../pages/Register";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Project from "../pages/Project";

export default function Routes() {
  return (
   
        <Switch>
          <Route path="/" exact>
            <Redirect to="/login" />
          </Route>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login}/>
          <Route path="/dashboard" exact isPrivate component={Dashboard} />
          <Route path="/dashboard/project/:id?" isPrivate component={Project} />
        </Switch>
  );
}