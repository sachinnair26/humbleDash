import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {Spin,Tabs} from 'antd';
import getReportData from './fetchReportAction';
import './Report.css';
const TabPane = Tabs.TabPane;
class Report extends React.Component {
constructor(props){
  super(props)
  this.state = {
    good:{},
    bad:{},
    average:{},
    dateList:[],
    deevice:'',
    hours:[5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,1,2,3,4],

  }
}

componentWillMount(){
    var dateTime = {};
    var good = {};
    var bad = {};
    var average = {};
    var device =''
    var count = 0;
    if(!this.props.report.DateList){
      this.props.history.push('/')
    }
    else
  {  for (var i = 0; i < this.props.report.DateList.length; i++) {

      var date2 = new Date(this.props.report.DateList[i.toString()])+''
            good[date2.slice(0,15)] = []
            bad[date2.slice(0,15)] = []
            average[date2.slice(0,15)] = []
            this.state.dateList.push(date2.slice(0,15))
            if(!this.props.report.ReportDataList[date2.slice(0,15)]){
              count = count + 1
            }
            else{
        this.props.report.ReportDataList[date2.slice(0,15)].forEach(v =>{
          device = v.deviceName
        if(v.good ===1)
        {
            var time1 = new Date(v.lastTimestamp)+''
            var time2 = Number(time1.slice(16,18))
            for(var x=1;x<=24;x++)
            {
              if(time2 === x)
              {
                  if(!good[date2.slice(0,15)][x])
                  {
                      good[date2.slice(0,15)][x] = 0,
                      good[date2.slice(0,15)][x] = good[date2.slice(0,15)][x] + 1
                    }
                    else
                    {
                      good[date2.slice(0,15)][x] = good[date2.slice(0,15)][x] + 1
                    }
              }
              else
              {
                if(!good[date2.slice(0,15)][x])
                {
                    good[date2.slice(0,15)][x] = good[date2.slice(0,15)][x] + 0 || 0
                  }
                  else
                  {
                    good[date2.slice(0,15)][x] = good[date2.slice(0,15)][x] + 0 || 0

                  }

              }


          }
        }
        if(v.bad ===1)
        {
            var time1 = new Date(v.lastTimestamp)+''
            var time2 = Number(time1.slice(16,18))
            for(var x=1;x<=24;x++)
            {
              if(time2 === x)
              {
                  if(!bad[date2.slice(0,15)][x])
                  {
                      bad[date2.slice(0,15)][x] = 0,
                      bad[date2.slice(0,15)][x] = bad[date2.slice(0,15)][x] + 1
                    }
                    else
                    {
                      bad[date2.slice(0,15)][x] = bad[date2.slice(0,15)][x] + 1
                    }
              }
              else
              {
                if(!bad[date2.slice(0,15)][x])
                {
                    bad[date2.slice(0,15)][x] = bad[date2.slice(0,15)][x] + 0 || 0
                  }
                  else
                  {
                    bad[date2.slice(0,15)][x] = bad[date2.slice(0,15)][x] + 0 || 0

                  }

              }



          }
        }
        if(v.average ===1)
        {
            var time1 = new Date(v.lastTimestamp)+''
            var time2 = Number(time1.slice(16,18))
            for(var x=1;x<=24;x++)
            {
              if(time2 === x)
              {
                  if(!average[date2.slice(0,15)][x])
                  {
                      average[date2.slice(0,15)][x] = 0,
                      average[date2.slice(0,15)][x] = average[date2.slice(0,15)][x] + 1
                    }
                    else
                    {
                      average[date2.slice(0,15)][x] = average[date2.slice(0,15)][x] + 1
                    }
              }
              else
              {
                if(!average[date2.slice(0,15)][x])
                {
                    average[date2.slice(0,15)][x] = average[date2.slice(0,15)][x] + 0 || 0
                  }
                  else
                  {
                    average[date2.slice(0,15)][x] = average[date2.slice(0,15)][x] + 0 || 0

                  }

              }



          }
        }


        })
    }}
    this.setState({good:good,bad:bad,average:average,device:device})
}
}
print(){
  window.print();
}
onChangeTab(key){
  console.log(key);
}

  render () {

    return(

     <div className='table1'>
        <h1>{this.state.device}</h1>
        <Tabs onChange={this.onChangeTab} type="card">
          <TabPane tab="Good" key="Good">
            <table>
              <tbody>
            <tr>
              <th>Date</th>
              {this.state.hours.map(a =><th style={{textAlign:'center'}}>{a}</th>)}
            </tr>

              {this.state.dateList.map(c =>
                <tr>

                    <td>{c}</td>
                {this.state.hours.map(d =>
                    this.state.good[c.toString()][d.toString()] >=5 ?
                                                        <td style={{backgroundColor:'green'}}>{this.state.good[c.toString()][d.toString()]}</td>
                                                          :
                                                          <td>{this.state.good[c.toString()][d.toString()]}</td>
                )}


                </tr>
              )

              }
              </tbody>
          </table>
        </TabPane>
          <TabPane tab="Bad" key="Bad">
            <table>
              <tbody>
          <tr>
            <th>Date</th>

            {this.state.hours.map(a =><th>{a}</th>)}
          </tr>

            {this.state.dateList.map(c =>
              <tr>

                <td>{c}</td>
              {this.state.hours.map(d =>
                  this.state.bad[c.toString()][d.toString()] >=5 ?
                                                    <td style={{backgroundColor:'red'}}>{this.state.bad[c.toString()][d.toString()]}</td>
                                                      :
                                                      this.state.bad[c.toString()][d.toString()] >=3 ?
                                                                                        <td style={{backgroundColor:'yellow'}}>{this.state.bad[c.toString()][d.toString()]}</td>
                                                                                         :
                                                                                          <td>{this.state.bad[c.toString()][d.toString()]}</td>

              )}


              </tr>
            )

            }
            </tbody>
        </table>
      </TabPane>
          <TabPane tab="Average" key="Average">
            <table>
              <tbody>
            <tr>
              <th>Date</th>
              {this.state.hours.map(a =><th>{a}</th>)}
            </tr>

              {this.state.dateList.map(c =>
                <tr>
                  <td>{c}</td>

                {this.state.hours.map(d =>
                    this.state.average[c.toString()][d.toString()] >=7 ?
                                                      <td style={{backgroundColor:'red'}}>{this.state.average[c.toString()][d.toString()]}</td>
                                                      :
                                                       this.state.average[c.toString()][d.toString()] >=4 ?
                                                                                          <td style={{backgroundColor:'yellow'}}>{this.state.average[c.toString()][d.toString()]}</td>
                                                                                            :
                                                                                            <td>{this.state.average[c.toString()][d.toString()]}</td>
                )}

                </tr>
              )

              }
              </tbody>
          </table>
          </TabPane>
        </Tabs>
        <button onClick={this.print.bind(this)}>print</button>
      </div>
    )
  }
}
const mapStateToProps = (state) =>({
  report:state.report.dataReport,
})
export default connect(mapStateToProps)(Report);
