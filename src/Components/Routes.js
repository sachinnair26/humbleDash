import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link,Switch } from "react-router-dom";
import App from './App';
import Report from './Report/Report';
import Login from './Login/Login';


export default class Routes extends Component {
  render() {
    return (
        <Router>
        <Switch>
          <Route path='/report' component={Report}/>
          <Route path='/dashboard' component={App}/>
          <Route path='/' component={Login}/>
          </Switch>
        </Router>
    )
  }
}
