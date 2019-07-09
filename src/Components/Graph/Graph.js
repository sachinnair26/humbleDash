import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Spin,
  Icon,
  DatePicker,
  Dropdown,
  Menu,
  Select,
  Button,
  Tooltip
} from 'antd'
import { connect } from 'react-redux'
import './Graph.css'
import b from '../Good.png'
import a from '../Bad.png'
import c from '../Avg.png'
const { Option } = Select

class Graph extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {},
      visible: true,
      good: [],
      bad: [],
      average: [],
      labels: [
        '12AM-1AM',
        '1AM-2AM',
        '2AM-3AM',
        '3AM-4AM',
        '4AM-5AM',
        '5AM-6AM',
        '6AM-7AM',
        '7AM-8AM',
        '8AM-9AM',
        '9AM-10AM',
        '10AM-11AM',
        '11AM-12PM',
        '12PM-1PM',
        '1PM-2PM',
        '2PM-3PM',
        '3PM-4PM',
        '4PM-5PM',
        '5PM-6PM',
        '6PM-7PM',
        '7PM-8PM',
        '8PM-9PM',
        '9PM-10PM',
        '10PM-11PM',
        '11PM-12AM'
      ],
      value: 1
    }
  }

  static getDerivedStateFromProps (props, state) {
    if (props.data !== state.data) {
      return {
        // the fetched data comes and it is set into props
        good: props.data.good,
        average: props.data.average,
        bad: props.data.bad,
        userdelight: props.data.userdelight,
        foot: props.data.foot
      }
    }
  }
  componentDidUpdate (prevProps, prevState) {
    if (this.props.data !== prevProps.data) {
      this.setState({ visible: false })
    }
  }

  render () {
    console.log(this.props.device)

    var datafoot = {
      labels: this.state.labels,
      datasets: [
        {
          /// this dataset is for foot fall icluding color of bars and data
          label: 'FootFall',
          backgroundColor: 'rgba(10, 167, 69, 0.2)',
          borderColor: 'rgba(10,167,69,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(10, 167, 69, 0.2)',
          hoverBorderColor: 'rgba(10,167,69,1)',
          data: this.state.foot
        }
      ]
    }
    var userdelight = {
      // this is for representing userdelight
      labels: this.state.labels,
      datasets: [
        {
          label: 'userdelight',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: this.state.userdelight
        }
      ]
    }
    var datagraph = {
      // this describes everythig like good bad average
      labels: this.state.labels,
      datasets: [
        {
          label: 'Good',
          backgroundColor: 'rgba(10, 167, 69, 0.2)',
          borderColor: 'rgba(10,167,69,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(10, 167, 69, 0.4)',
          hoverBorderColor: 'rgba(10,167,69,1)',
          data: this.state.good
        },
        {
          label: 'Bad',
          backgroundColor: 'rgba(205,92,92, 0.2)',
          borderColor: 'rgba(205,92,92, 0.2)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: this.state.bad
        },
        {
          label: 'Average',
          backgroundColor: 'rgba(255, 193, 7, 0.2)',
          borderColor: 'rgba(255,193,7,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255, 193, 7, 0.4)',
          hoverBorderColor: 'rgba(255,193,7,1)',
          data: this.state.average
        }
      ]
    }
    console.log(window);
    
    return (
      <div className='graph'>
        {this.state.visible ? (
          <Spin />
        ) : (
          <div className='inside-conditional-container'>
            <div className='date-picker-selector'>
              <div className='dateChanger'>
                <Icon
                  style={{ margin: '6px', cursor: 'pointer' }}
                  type='left'
                  theme='outlined'
                  onClick={this.props.previousDayButton}
                />
                <DatePicker
                  onChange={this.props.onDateChange}
                  value={this.props.date}
                />
                <Icon
                  style={{ margin: '6px', cursor: 'pointer' }}
                  type='right'
                  theme='outlined'
                  onClick={this.props.nextDayButton}
                />
              </div>
              <Tooltip placement='top' title={<span>Generate Report</span>}>
                <Button onClick={this.props.showReportModal}>
                  <Icon type='table' />
                </Button>
              </Tooltip>
              <div className='device-selector-div'>
                <Select
                  onChange={(a, b) => {
                    this.props.getTableData(b.props.value, b.props.children)
                  }}
                  defaultActiveFirstOption
                  style={{ width: '80%', marginRight: '4px' }}
                  defaultValue={this.props.device[0].devicename}
                  value={this.props.currentDevice}
                >
                  {this.props.device.map(pp => (
                    <Option value={pp.devicename}>{pp.location}</Option>
                  ))}
                </Select>
                <Tooltip placement='top' title={<span>Device Table</span>}>
                  <Button onClick={this.props.onClickToShowDrawer}>
                    <Icon type='align-center' />
                  </Button>
                </Tooltip>
              </div>
            </div>
            <Bar
              data={
                this.props.value === 1
                  ? datagraph // for 1 good bad avereage graph is taken
                  : this.props.value === 2 // for 2 userdelight and for 3 footfall is taken
                    ? userdelight
                    : datafoot
              }
              options={{ maintainAspectRatio: window.innerWidth  <= 600 ? false : true, responsive: true }}
            />

            <div className='smileys'>
              <div className='goodSmiley'>
                <img src={b} width={40} height={40} className='smiley-pic' />
                <span className='text-span' style={{ textAlign: 'center' }}>
                  {this.props.goodCount}
                </span>
              </div>
              <div className='avgSmiley'>
                <img src={c} width={40} height={40} className='smiley-pic' />
                <span className='text-span' style={{ textAlign: 'center' }}>
                  {this.props.averageCount}
                </span>
              </div>
              <div className='badSmiley'>
                <img src={a} width={40} height={40} className='smiley-pic' />
                <span className='text-span' style={{ textAlign: 'center' }}>
                  {this.props.badCount}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  data: state.data,
  device: state.device
})
export default connect(mapStateToProps)(Graph)
