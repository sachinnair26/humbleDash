import React from 'react'
import DashboardContainer from './Container/DashboardContainer';
const Dashboard = (props) =>{
    console.log(props);
    
    return (
        <div>
           <DashboardContainer {...props}/>
        </div>
    )
}

export default Dashboard;