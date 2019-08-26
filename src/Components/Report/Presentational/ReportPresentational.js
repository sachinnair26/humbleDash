import React from 'react';
import {Spin,Slider,Tabs} from 'antd';
import '../index.css';
const TabPane = Tabs.TabPane;

const ReportPresentational = ({
    spin,
    thresholdAvgHigh,
    thresholdAvgSecondHigh,
    thresholdBadHigh,
    thresholdBadSecondHigh,
    thresholdGood,
    onChangeSlider,
    date_list,
    report_device,
    report_good,
    report_bad,
    report_average,
    device_list
}) =>{
    var hours = [ "05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","01","02","03","04"];
    
    return(
        <div className="report">
        {spin ? <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
          <Spin/> 
          </div>
          : <div>
         
            <h1>{device_list.map(point =>{
              if(point.devicename === report_device){
                return point.location
              }
            })}</h1>
            
            <Tabs type="card">
            <TabPane tab="Good" key="Good">
            <div style={{width:'10%'}}>
          Threshold Value
          <Slider value={thresholdGood} 
         onChange={(e)=>{onChangeSlider("thresholdGood",e)}} 
           min={1}  max={10}  marks={{
       
       10: {
         style: {
           color: 'green',
         },
         label: <strong>Green</strong>,
       },
     }}/>
        </div>
            <table  className="table2">
                <tbody>
                    <tr>
                        <th>Date</th>
                        {hours.map(o=>(
                            <th style={{ textAlign: "center" }}>{o}</th>
                        ))}
                    </tr>
                       {date_list.map(c=>(       ///this is the mapping of each element of the arrya of the report 
                                                                  //this is done by having 2 arrays one with 24 hours and one with the list of dates
                                                                  //using these 2 we map eachelemt on the table
                    <tr>
                        <td>{c}</td>
                            {hours.map(d=>(
                                report_good[c.toString()][Number(d).toString()] >= thresholdGood ? (
                                    <td style={{ backgroundColor: "green" }}>
                                      {report_good[c.toString()][Number(d).toString()]}    
                                    </td>
                                  ) : (
                                    <td>{report_good[c.toString()][Number(d).toString()]}</td>
                                  )
                            ))}                           
                    </tr>
                           ))}
                </tbody>
            </table>
            </TabPane>
            <TabPane tab="Bad" key="Bad">
            <div style={{width:'10%'}}>
          Threshold Value
          <Slider value={thresholdBadHigh}
           onChange={(e)=>{onChangeSlider("thresholdGood",e)}} 
            min={1}  max={10} marks={{
       
       10: {
         style: {
           color: 'red',
         },
         label: <strong>Red</strong>,
       },
     }}/>

          <Slider value={thresholdBadSecondHigh}
          onChange={(e)=>{onChangeSlider("thresholdGood",e)}}
            min={1}  max={10} marks={{
       
       10: {
         style: {
           color: 'yellow',
         },
         label: <strong>Yellow</strong>,
       },
     }}/>

        </div>
            <table className="table2">
              <tbody>
                <tr>
                  <th>Date</th>

                  {hours.map(a => (
                    <th style={{ textAlign: "center" }}>{a}</th>
                  ))}
                </tr>

                {date_list.map(c => (
                  <tr>
                    <td>{c}</td>
                    {hours.map(
                      d =>
                        report_bad[c.toString()][Number(d).toString()] >= thresholdBadHigh ? (
                          <td style={{ backgroundColor: "red" }}>
                            {report_bad[c.toString()][Number(d).toString()]}
                          </td>
                        ) : report_bad[c.toString()][Number(d).toString()] >= thresholdBadSecondHigh ? (
                          <td style={{ backgroundColor: "yellow" }}>
                            {report_bad[c.toString()][Number(d).toString()]}
                          </td>
                        ) : (
                          <td>{report_bad[c.toString()][Number(d).toString()]}</td>
                        )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>            
            </TabPane>
            <TabPane tab="Average" key="Average">
            <div style={{width:'10%'}}>
          Threshold Value
          <Slider value={thresholdAvgHigh} onChange={(e)=>{onChangeSlider("thresholdGood",e)}}  min={1}  max={10} marks={{
       
       10: {
         style: {
           color: 'red',
         },
         label: <strong>Red</strong>,
       },
     }}/>
          <Slider value={thresholdAvgSecondHigh} onChange={(e)=>{onChangeSlider("thresholdGood",e)}}  min={1}  max={10} marks={{
       
       10: {
         style: {
           color: 'yellow',
         },
         label: <strong>Yellow</strong>,
       },
     }}/>

        </div>
            <table className="table2">
              <tbody>
                <tr>
                  <th>Date</th>
                  {hours.map(a => (
                    <th style={{ textAlign: "center" }}>{a}</th>
                  ))}
                </tr>

                {date_list.map(c => (
                  <tr>
                    <td>{c}</td>

                    {hours.map(
                      d =>
                        report_average[c.toString()][Number(d).toString()] >= thresholdAvgHigh ? (
                          <td style={{ backgroundColor: "red" }}>
                            {report_average[c.toString()][Number(d).toString()]}
                          </td>
                        ) : report_average[c.toString()][Number(d).toString()] >=
                        thresholdAvgSecondHigh ? (
                          <td style={{ backgroundColor: "yellow" }}>
                            {report_average[c.toString()][Number(d).toString()]}
                          </td>
                        ) : (
                          <td>
                            {report_average[c.toString()][Number(d).toString()]}
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

export default ReportPresentational;