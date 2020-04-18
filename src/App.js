import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Register from "./component/register";
import Login from "./component/login";
import Dashboard from "./component/dashboard";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    // fetch("http://192.168.31.128:8080/user/");
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </Router>
    );
  }
}
