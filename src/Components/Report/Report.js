import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Spin,Tabs} from 'antd';
import './Report.css';
const TabPane = Tabs.TabPane;
class Report extends Component {
    constructor(props){
        super(props);
        this.state={
            report:{},
            spin:true,
            hours: [ 5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,1,2,3,4]
        }
    }
   componentDidMount(){

    if(this.props.user === null){
      this.props.history.push('/dashboard')
    }
   }
   
    static getDerivedStateFromProps(props,state){
        if(props.report !== state.report)
        return{ 
            report:props.report     //get the valeu of the report
        }
    }
    componentDidUpdate(prevProps,prevState){
       if(prevProps.report !== this.props.report){
         this.setState({spin:false})
       }
       
      
    }
    render() {
      
    return (
      <div className="report">
        {this.state.spin ? <Spin/> : <div>
         
            <h1>sachin</h1>
            <Tabs type="card">
            <TabPane tab="Good" key="Good">
            <table  className="table1">
                <tbody>
                    <tr>
                        <th>Date</th>
                        {this.state.hours.map(o=>(
                            <th style={{ textAlign: "center" }}>{o}</th>
                        ))}
                    </tr>
                       {this.state.report.dateList.map(c=>(       ///this is the mapping of each element of the arrya of the report 
                                                                  //this is done by having 2 arrays one with 24 hours and one with the list of dates
                                                                  //using these 2 we map eachelemt on the table
                    <tr>
                        <td>{c}</td>
                            {this.state.hours.map(d=>(
                                this.state.report.good[c.toString()][d.toString()] >= 5 ? (
                                    <td style={{ backgroundColor: "green" }}>
                                      {this.state.report.good[c.toString()][d.toString()]}    
                                    </td>
                                  ) : (
                                    <td>{this.state.report.good[c.toString()][d.toString()]}</td>
                                  )
                            ))}                           
                    </tr>
                           ))}
                </tbody>
            </table>
            </TabPane>
            <TabPane tab="Bad" key="Bad">
            <table className="table1">
              <tbody>
                <tr>
                  <th>Date</th>

                  {this.state.hours.map(a => (
                    <th style={{ textAlign: "center" }}>{a}</th>
                  ))}
                </tr>

                {this.state.report.dateList.map(c => (
                  <tr>
                    <td>{c}</td>
                    {this.state.hours.map(
                      d =>
                        this.state.report.bad[c.toString()][d.toString()] >= 5 ? (
                          <td style={{ backgroundColor: "red" }}>
                            {this.state.report.bad[c.toString()][d.toString()]}
                          </td>
                        ) : this.state.report.bad[c.toString()][d.toString()] >= 3 ? (
                          <td style={{ backgroundColor: "yellow" }}>
                            {this.state.report.bad[c.toString()][d.toString()]}
                          </td>
                        ) : (
                          <td>{this.state.report.bad[c.toString()][d.toString()]}</td>
                        )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>            
            </TabPane>
            <TabPane tab="Average" key="Average">
            <table className="table1">
              <tbody>
                <tr>
                  <th>Date</th>
                  {this.state.hours.map(a => (
                    <th style={{ textAlign: "center" }}>{a}</th>
                  ))}
                </tr>

                {this.state.report.dateList.map(c => (
                  <tr>
                    <td>{c}</td>

                    {this.state.hours.map(
                      d =>
                        this.state.report.average[c.toString()][d.toString()] >= 7 ? (
                          <td style={{ backgroundColor: "red" }}>
                            {this.state.report.average[c.toString()][d.toString()]}
                          </td>
                        ) : this.state.report.average[c.toString()][d.toString()] >=
                        4 ? (
                          <td style={{ backgroundColor: "yellow" }}>
                            {this.state.report.average[c.toString()][d.toString()]}
                          </td>
                        ) : (
                          <td>
                            {this.state.report.average[c.toString()][d.toString()]}
                          </td>
                        )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
            </TabPane>
            </Tabs>
            
        </div>}
      </div>
    )
  }
}
const mapStateToProps = state =>({
    report:state.report,
    user:state.user
})
export default connect(mapStateToProps)(Report);