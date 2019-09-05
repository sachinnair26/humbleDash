import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Dashboard from "./Components/Dashboard";
import Report from './Components/Report';
import Login from './Components/Login';
const Routes = () =>{
    return(
        <Router>
            <Switch>
                <Route path='/report' exact component={Report}/>
                <Route path='/dashboard' exact component={Dashboard}/>
                <Route path='/' component={Login}/>
            </Switch>
        </Router>
    )
}

export default Routes;