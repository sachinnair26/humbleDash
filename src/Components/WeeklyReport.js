import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Spin,Tabs, Input,Slider} from 'antd';
import './WeeklyReports.css';
const TabPane = Tabs.TabPane;
class Report extends Component {
    constructor(props){
        super(props);
        this.state={
            report:{},
            spin:true,
            device:'',
            hours: [5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,1,2,3,4],
            thresholdGood:5,
            thresholdBadHigh:5,
            thresholdBadSecondHigh:3,
            thresholdAvgHigh:7,
            thresholdAvgSecondHigh:4,
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
        this.props.device.map(device =>{
            if(this.props.report.device === device.devicename){
              this.setState({device:device.location})
            }
         }) 
         this.setState({spin:false})
       }
       
      
    }
    render() {
     
    return (
      <div className="report">
       
        {this.state.spin ? <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
          <Spin/> 
          </div>
          : <div>
         
            <h1>{this.state.device}</h1>
            
            <Tabs type="card">
            
            <TabPane tab="Bad" key="Bad">
            <div style={{width:'40%'}}>
          Threshold Value
          <Slider value={this.state.thresholdBadHigh} onChange={(a)=>{this.setState({thresholdBadHigh:a})}}  min={1}  max={10} marks={{
       
       10: {
         style: {
           color: 'red',
         },
         label:<strong style={{fontSize:'10px'}}>Red</strong>,
       },
     }}/>
          <Slider value={this.state.thresholdBadSecondHigh} onChange={(a)=>{this.setState({thresholdBadSecondHigh:a})}}  min={1}  max={10} marks={{
       
       10: {
         style: {
           color: 'yellow',
         },
         label:<strong style={{fontSize:'10px'}}>Yellow</strong>,
       },
     }}/>

        </div>
            <table className="table2">
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
                        this.state.report.bad[c.toString()][d.toString()] >= this.state.thresholdBadHigh ? (
                          <td style={{ backgroundColor: "red" }}>
                            {this.state.report.bad[c.toString()][d.toString()]}
                          </td>
                        ) : this.state.report.bad[c.toString()][d.toString()] >= this.state.thresholdBadSecondHigh ? (
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
            <div style={{width:'40%'}}>
          Threshold Value
          <Slider value={this.state.thresholdAvgHigh} onChange={(a)=>{this.setState({thresholdAvgHigh:a})}}  min={1}  max={10} marks={{
       
       10: {
         style: {
           color: 'red',
         },
         label:<strong style={{fontSize:'10px'}}>Red</strong>,
       },
     }}/>
          <Slider value={this.state.thresholdAvgSecondHigh} onChange={(a)=>{this.setState({thresholdAvgSecondHigh:a})}}  min={1}  max={10} marks={{
       
       10: {
         style: {
           color: 'yellow',
         },
         label:<strong style={{fontSize:'10px'}}>Yellow</strong>,
       },
     }}/>

        </div>
            <table className="table2">
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
                        this.state.report.average[c.toString()][d.toString()] >= this.state.thresholdAvgHigh ? (
                          <td style={{ backgroundColor: "red" }}>
                            {this.state.report.average[c.toString()][d.toString()]}
                          </td>
                        ) : this.state.report.average[c.toString()][d.toString()] >=
                        this.state.thresholdAvgSecondHigh ? (
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
            <TabPane tab="Good" key="Good">
            <div style={{width:'40%'}}>
          Threshold Value
          <Slider value={this.state.thresholdGood} onChange={(a)=>{this.setState({thresholdGood:a})}}  min={1}  max={10}  marks={{
       
       10: {
         style: {
           color: 'green',
         },
         label:<strong style={{fontSize:'10px'}}>Green</strong>,
       },
     }}/>
        </div>
            <table  className="table2">
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
                        <td>{c.slice(0,10)}</td>
                            {this.state.hours.map(d=>(
                                this.state.report.good[c.toString()][d.toString()] >= this.state.thresholdGood ? (
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
            </Tabs>
            
        </div>}
      </div>
    )
  }
}
const mapStateToProps = state =>({
    report:state.report,
    user:state.user,
    device:state.device
})
export default connect(mapStateToProps)(Report);