import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";

export default function Routes() {
  return (
    <Router>
        <Switch>
          <Route path="/register">
              <Register />
          </Route>
          <Route path="/login">
              <Login />
          </Route>
          <Route path="/users">
          </Route>
          <Route path="/">
          </Route>
        </Switch>
    </Router>
  );
}