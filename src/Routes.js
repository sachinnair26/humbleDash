import React from 'react'
import PropTypes from 'prop-types'
import App from './App';
import Report from './Report';
import {Spin} from 'antd';
import { BrowserRouter as Router, Route, Link,Switch } from "react-router-dom";
import {connect} from 'react-redux';
import Login from './Login';
class Routes extends React.Component {
  componentDidMount(){
    console.log(this.props);
    
  }
  render () {

  return(
    <Router>
    <Switch>
      <Route path='/report' component={Report}/>
      <Route path='/:id' component={App}/>
      <Route path='/' component={Login}/>
      </Switch>
    </Router>
  )
  }
}


export default Routes;
