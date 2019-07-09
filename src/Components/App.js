import React, { Component } from 'react'
import './App.css'
import {
  Modal,
  Button,
  DatePicker,
  Spin,
  Select,
  Radio,
  Icon,
  Alert,
  message,
  Drawer,
  Input,
  Dropdown,
  Menu
} from 'antd'
import Graph from './Graph/Graph'
import moment from 'moment'
import { connect } from 'react-redux'
import DeviceTable from './Table/Table'
import { AuthUser, signOut } from './Actions/AuthState'
import FetchDataAction from './Actions/FetchDataAction'
import FetchReport from './Actions/FetchReport'
import FetchDeviceAction from './Actions/FetchDeviceAction'
import createHistory from 'history/createBrowserHistory'

import { db } from '../config'
const history = createHistory({ forceRefresh: true })

const RadioGroup = Radio.Group
const Option = Select.Option
const { RangePicker } = DatePicker
class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modal: false,
      deviceList: [],
      num: 1,
      deviceForReport: '',
      currentDevice: '',
      organisation: '',
      date: '',
      DatePicker: '',
      goodCount: 0,
      averageCount: 0,
      badCount: 0,
      userDelightCount: 0,
      footfallCount: 0,
      percentaverage: 0,
      percentgood: 0,
      percentbad: 0,
      value: 1,
      currentdevicelocation: '',
      showDrawer: false,
      dateList: [],
      backgroundColor: localStorage.getItem('background')
        ? localStorage.getItem('background')
        : '#7780e8'
    }
  }
  componentDidMount () {
    this.props.AuthUser() // as soon as page loads it checks for the user if user is present
  }
  onDateChange = (date, dateString) => {
    // func takes the date changes in the format of the firebase nodes and execute the fuction for fetching the devices for the table
    this.setState({ date: date })
    var date1 = new Date(date).toDateString('YYYY-MM-DD')
    this.props.FetchDeviceAction(
      date1,
      this.state.organisation,
      this.props.user.uid
    )
  }
  getTableData = (a, b) => {
    // so whenever we click on any elemnt on the table it is sent to the parent component and current device is set to that device
    this.setState({ currentDevice: a, currentdevicelocation: b })
    var date1 = new Date(this.state.date).toDateString('YYYY-MM-DD')
    this.props.FetchDataAction(date1, a, this.state.organisation) // data is fetched then
  }
  static getDerivedStateFromProps (props, state) {
    if (props.device !== state.device) {
      return {
        deviceList: props.device // if is used to get props after is is fetched
      }
    }
  }
  componentDidUpdate (prevProps, prevState) {
    if (this.props.device !== prevProps.device) {
      if (prevProps.device.length === 0) {
        // now when the page loads for the first time previous props are empty so it segnifies the page is loading for the first time
        var date1 = new Date(this.state.date).toDateString('YYYY-MM-DD')
        this.props.FetchDataAction(
          date1, /// so we select the firsdt devcie as the device and fetch data for that
          this.props.device[0].devicename,
          this.state.organisation
        )

        this.setState({
          spin: false,
          currentDevice: this.props.device[0].devicename,
          currentdevicelocation: this.props.device[0].location
        })
      } else {
        // now if previous props are not empty it is not loading for the fist time so we can put current device as one that is clicked by the user
        var date1 = new Date(this.state.date).toDateString('YYYY-MM-DD')
        this.props.FetchDataAction(
          date1,
          this.state.currentDevice,
          this.state.organisation
        )

        this.setState({ spin: false })
      }
    }
    if (this.props.user !== prevProps.user) {
      if (this.props.user !== null) {
        var that = this // if user is founnd then using the uid we fetch the organisation and initate the fetching of devices
        db.ref('deviceDetail')
          .child(this.props.user.uid)
          .on('value', function (data) {
            data.forEach(z => {
              var organisation = z.key
              var date2 = moment(new Date(), 'YYYY-MM-DD')
              var date1 = new Date(date2).toDateString('YYYY-MM-DD')
              that.setState({ organisation, date: date2 })
              that.props.FetchDeviceAction(date1, z.key, that.props.user.uid)
            })
          })
      } else {
        history.push('/')
      }
    }

    if (this.props.data !== prevProps.data) {
      const {
        UserDelightCount, // this checks for the data as soon it comes it is set to the state
        goodCount,
        badCount,
        avgCount,
        total
      } = this.props.data
      var percentgood = Math.round((goodCount / total) * 100) || 0
      var percentaverage = Math.round((avgCount / total) * 100) || 0
      var percentbad = Math.round((badCount / total) * 100) || 0
      this.setState({
        userDelightCount: UserDelightCount,
        goodCount: goodCount,
        badCount: badCount,
        averageCount: avgCount,
        footfallCount: total,
        percentaverage,
        percentbad,
        percentgood
      })

      if (badCount - prevState.badCount === 1) {
        message.error("You've Got a bad feedback")
      }
    }
  }

  onRangePicker = (date, dateString) => {
    // this takes the final and intal dates for the report
    if (moment(dateString[0]) > moment('2018-05-04')) {
      var dateList = [] // then each and every date is generated from the the start and the end dates
      var currentDate = moment(dateString[0])
      var stopDate = moment(dateString[1])
      while (currentDate <= stopDate) {
        dateList.push(moment(currentDate).format('YYYY-MM-DD'))
        currentDate = moment(currentDate).add(1, 'days')
      }
    } else {
      alert('Please choose a valid date')
    }
    this.setState({ dateList }) // this is set as dateList
  }
  onChangeRadio = e => {
    // this for the radio buttons to select weekly monthly or the range report
    if (e.target.value === 1) {
      this.selectDateReportWeekly()
      this.setState({ num: e.target.value })
    } else if (e.target.value === 2) {
      this.selectDateReportMonthly()
      this.setState({ num: e.target.value })
    } else if (e.target.value === 3) {
      this.setState({ num: e.target.value })
    }
  }
  previousDayButton () {
    // this si the button near date sleector and whenever it cahges the date by one day and fetch the data
    var prevDay = moment(this.state.date).subtract(1, 'days')
    this.setState({ date: prevDay })
    var date1 = new Date(prevDay).toDateString('YYYY-MM-DD')
    this.props.FetchDeviceAction(
      date1,
      this.state.organisation,
      this.props.user.uid
    )
  }
  nextDayButton () {
    // it changes the day by one day and fetch the data
    var nextDay = moment(this.state.date).add(1, 'days')
    this.setState({ date: nextDay })
    var date1 = new Date(nextDay).toDateString('YYYY-MM-DD')
    this.props.FetchDeviceAction(
      date1,
      this.state.organisation,
      this.props.user.uid
    )
  }
  selectDateReportMonthly () {
    // this is to geterate repot monthly it takes current date and convert it into an array of last one month and send it to fetch report
    var dateList = []
    var todaysDate = moment(new Date()).subtract(1, 'days')
    var weekpast = moment(todaysDate).subtract(1, 'months')
    while (weekpast <= todaysDate) {
      dateList.push(moment(weekpast).format('YYYY-MM-DD'))
      weekpast = moment(weekpast).add(1, 'days')
    }
    this.setState({ dateList })
  }
  selectDateReportWeekly () {
    // this for genrating weekly reports
    var dateList = []
    var todaysDate = moment(new Date()).subtract(1, 'days')
    var weekpast = moment(todaysDate).subtract(6, 'days')
    while (weekpast <= todaysDate) {
      dateList.push(moment(weekpast).format('YYYY-MM-DD'))
      weekpast = moment(weekpast).add(1, 'days')
    }
    this.setState({ dateList })
  }

  onOkForReport = () => {
    // on pressing this it initiates fetching o report
    if (this.state.deviceForReport === '' || this.state.dateList === []) {
      console.log('i reach here')

      message.error('Enter the credentials')
    } else {
      this.props.FetchReport(
        this.state.dateList,
        this.state.deviceForReport,
        this.state.organisation
      )
      this.setState({ modal: false })
      this.props.history.push('/report')
    }
  }
  UserDelightClick () {
    // when tis is clicked it is passed onto the graph component and graph is chenged
    this.setState({ value: 2 })
  }
  footFallClick () {
    // when tis is clicked it is passed onto the graph component and graph is chenged
    this.setState({ value: 3 })
  }
  onlogoutClick = () => {
    localStorage.removeItem('email')
    localStorage.removeItem('password')
    this.props.signOut()
    history.push('/')
  }
  onChangeBackground = e => {
    localStorage.setItem('background', e.target.value)
    this.setState({ backgroundColor: e.target.value })
  }
  onClickToShowDrawer = () => {
    this.setState({ showDrawer: !this.state.showDrawer })
  }
  showReportModal = () =>{
    this.setState({modal:true})
  }
  render () {
    return (
      <div className='App'>
      
        <Drawer
          closable={true}
          title='Deivce Table'
          placement='right'
          width={window.innerWidth <=600 ? window.innerWidth-90:420}
          closable={false}
          onClose={this.onClickToShowDrawer}
          visible={this.state.showDrawer}
        >
          <DeviceTable getData={this.getTableData} onClickToShowDrawer={this.onClickToShowDrawer} />
        </Drawer>
        <div className='header'>
        <Input
            type='color'
            value={this.state.backgroundColor}
            onChange={this.onChangeBackground}
            style={{width:'4%',margin:'5px'}}
          />
          <h2 style={{ margin: 'auto', textAlign: 'center' }}>
            Toilet Monitoring System
          </h2>
          
         
         
          <Dropdown overlay={(<Menu><Menu.Item onClick={this.onlogoutClick}>Logout</Menu.Item></Menu>)}>
          <Icon type="user" style={{fontSize:'20px',lineHeight:2,marginRight:'5px',cursor:'pointer'}} />
          </Dropdown>
        </div>
        <div
          className='main'
          style={{ backgroundColor: this.state.backgroundColor }}
        >
          
          <div className='graphData'>
            <div className='head2'>
              <div className='content1 '>
                <h5>Device Location:</h5>
                <h4>{this.state.currentdevicelocation}</h4>
              </div>

              <div
                className='content1'
                onClick={this.UserDelightClick.bind(this)}
              >
                <h5>UserDelight</h5>
                <h3>{this.state.userDelightCount}</h3>
              </div>
              <div className='content1' onClick={this.footFallClick.bind(this)}>
                <h5>FootFall:</h5>
                <h3>{this.state.footfallCount}</h3>
              </div>
            </div>
            <div className='barStyle'>
              <span
                className='goodSpan'
                style={{
                  width: this.state.percentgood + '%',
                  transition: 'width 1s'
                }}
              >
                {this.state.goodCount}
              </span>
              <span
                className='avgSpan'
                style={{
                  width: this.state.percentaverage + '%',
                  transition: 'width 1s'
                }}
              >
                {this.state.averageCount}
              </span>
              <span
                className='badSpan'
                style={{
                  width: this.state.percentbad + '%',
                  transition: 'width 1s'
                }}
              >
                {this.state.badCount}
              </span>
            </div>
            <div
              onClick={() => {
                this.setState({ value: 1 })
              }}
              className='graph-outside'
            >
              <Graph
                value={this.state.value}
                previousDayButton={this.previousDayButton.bind(this)}
                getTableData={this.getTableData}
                onDateChange={this.onDateChange}
                date={this.state.date}
                nextDayButton={this.nextDayButton.bind(this)}
                goodCount={this.state.goodCount}
                badCount={this.state.badCount}
                averageCount={this.state.averageCount}
                showReportModal={this.showReportModal}
                onClickToShowDrawer={this.onClickToShowDrawer}
                currentDevice={this.state.currentDevice}
              />
            </div>
          </div>
        </div>
        <Modal
          title='Basic Modal'
          visible={this.state.modal}
          onOk={this.onOkForReport}
        >
          <div className='report-select'>
            <RadioGroup onChange={this.onChangeRadio}>
              <Radio value={1}>By Week</Radio>
              <Radio value={2}>By Month</Radio>
              <Radio value={3}>Range</Radio>
            </RadioGroup>
            {this.state.num == 3 ? (
              <RangePicker
                onChange={this.onRangePicker}
                style={{ width: 200 }}
              />
            ) : null}
            {this.state.spin ? (
              <Spin />
            ) : (
              <Select
                placeholder='Select Davice'
                onChange={e => {
                  this.setState({ deviceForReport: e })
                }}
                style={{ width: 200 }}
              >
                {this.state.deviceList.map(o => (
                  <Option value={o.devicename} key={o.id}>
                    {o.location}
                  </Option>
                ))}
              </Select>
            )}
          </div>
        </Modal>
      </div>
    )
  }
}
const mapActionToProps = {
  FetchDataAction: FetchDataAction,
  FetchDeviceAction: FetchDeviceAction,
  FetchReport: FetchReport,
  AuthUser: AuthUser,
  signOut: signOut
}
const mapStateToProps = state => ({
  data: state.data,
  device: state.device,
  user: state.user
})
export default connect(
  mapStateToProps,
  mapActionToProps
)(App)
