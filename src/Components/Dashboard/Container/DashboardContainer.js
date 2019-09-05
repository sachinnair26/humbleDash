import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import FetchDailyDataAction from '../../Actions/FetchDailyDataAction'
import DashboardPresentational from '../Presentational/DashboardPresentational'
import ChangeDateAction from '../../Actions/ChangeDateAction'
import FetchDeviceAction from '../../Actions/FetchDeviceAction'
import ChangeDeviceAction from '../../Actions/ChangeDeviceAction'
import FetchReportAction from '../../Actions/FetchReportAction'
import {UserLogoutFunction} from '../../Actions/UserLoginAction';
import { message } from 'antd'
class DashboardContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dateList: [],
      search_value:1,
      report7days: {},
      search_return:{},
      thresholdGood: 5,
      thresholdAvgHigh: 3,
      thresholdBadHigh: 5,
      modal_visible: false,
      device_for_report: '',
      graph_display_value:1,
      report_radio_value: '',
      modal_for_7_days: false,
      thresholdBadSecondHigh: 3,
      thresholdAvgSecondHigh: 5
    }
  }
  componentDidMount () {
    if(this.props.logged_in){

      this.props.FetchDeviceAction(this.props.selected_date)
    }else{
      this.props.history.push('/')
    }
  }
  componentDidUpdate(prevProps,prevState){
    if(prevProps.logged_in !== this.props.logged_in && !this.props.logged_in){
      this.props.history.push('/')
    }
  }
  onPreviousDateSelect = () => {
    var previous_date = moment(this.props.selected_date).subtract(1, 'days')
    if(previous_date <= moment(this.props.installation_date)){
      message.error(`Please Select Date after ${this.props.installation_date}`)
      this.props.ChangeDateAction(this.props.installation_date)
    }else{

      this.props.ChangeDateAction(previous_date)
    }
  }
  onNextDateSelect = () => {
    var next_date = moment(this.props.selected_date).add(1, 'days')
    if(next_date <= moment(this.props.installation_date)){
      message.error(`Please Select Date after ${this.props.installation_date}`)
      this.props.ChangeDateAction(this.props.installation_date)
      
    }else{

      this.props.ChangeDateAction(next_date)
    }
  }
  onChangeDatePicker = (date,dateString)=>{
    if(moment(date) <= moment(this.props.installation_date)){
      message.error(`Please Select Date after ${this.props.installation_date}`)
      this.props.ChangeDateAction(this.props.installation_date)

    }else{

      this.props.ChangeDateAction(date)
    }
    
  }
  onClickReportButton = () => {
    this.setState({ modal_visible: true })
  }
  onChangeReportRadio = e => {
    this.setState({ report_radio_value: e.target.value })
    if (e.target.value === 1) {
      this.getReportWeekly()
    } else if (e.target.value === 2) {
      this.getReportMonthly()
    } else if (e.target.value === 3) {
    }
  }
  getReportWeekly = () => {
    var dateList = []
    var todays_date = moment(new Date()).subtract(1, 'days')
    var weekpast = moment(todays_date).subtract(6, 'days')
    while (weekpast <= todays_date) {
      dateList.push(moment(weekpast).format('YYYY-MM-DD'))
      weekpast = moment(weekpast).add(1, 'days')
    }
    this.setState({ dateList })
  }
  getReportMonthly = () => {
    var dateList = []
    var todays_date = moment(new Date()).subtract(1, 'days')
    var weekpast = moment(todays_date).subtract(1, 'months')
    while (weekpast <= todays_date) {
      dateList.push(moment(weekpast).format('YYYY-MM-DD'))
      weekpast = moment(weekpast).add(1, 'days')
    }
    this.setState({ dateList })
  }
  getReportByRange = (date, dateString) => {
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
    this.setState({ dateList })
  }
  onClickOkModal = () => {
    if (
      this.state.device_for_report === '' ||
      this.state.report_radio_value === ''
    ) {
      message.error('Select a device  and Date')
    } else {
      this.props.FetchReportAction(
        this.state.dateList,
        this.state.device_for_report
      )
      this.setState({ modal_visible: false })
      this.props.history.push('/report')
    }
  }
  onClickCancelModal = () => {
    this.setState({ modal_visible: false })
  }
  onChangeSelectForReport = e => {
    this.setState({ device_for_report: e })
  }
  onClick7DayReport = (devicename, location) => {
    var report7days = {
      ...this.props.report7days[devicename],
      location: location
    }
    this.setState({ report7days: report7days, modal_for_7_days: true })
  }
  onChangeSlider = (variable, e) => {
    this.setState({ [variable]: e })
  }
  onClickCloseOnMiniReportModal = () => {
    this.setState({ modal_for_7_days: false })
  }
  onClickLogoutButton = () =>{
    this.props.UserLogoutFunction();
  }
  onSearch =(e) =>{   
    if(e.target.value.length >0 ){
      this.setState({search_value:2})
    }
    this.setState({
      search_return: this.props.device_list.filter(function(el) {
        if (!el.location) {
        } else {
          return (
            el.location.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
            );
          }
        })
      });
    }
    onClickToChangeGraph = (value) =>{
      this.setState({graph_display_value:value})
    }
  render () {
    const {
      good,
      bad,
      average,
      userdelight,
      foot,
      goodCount,
      badCount,
      avgCount,
      total,
      UserDelightCount
    } = this.props.daily_data
    const {
      ChangeDateAction,
      device_list,
      loading,
      ChangeDeviceAction,
      selected_date
    } = this.props

    return (
      <div>
        <DashboardPresentational
          good={good}
          bad={bad}
          average={average}
          userdelight={userdelight}
          foot={foot}
          goodCount={goodCount}
          badCount={badCount}
          avgCount={avgCount}
          total={total}
          UserDelightCount={UserDelightCount}
          ChangeDateAction={ChangeDateAction}
          device_list={device_list}
          loading={loading}
          ChangeDeviceAction={ChangeDeviceAction}
          selected_date={selected_date}
          thresholdAvgHigh={this.state.thresholdAvgHigh}
          thresholdAvgSecondHigh={this.state.thresholdAvgSecondHigh}
          thresholdBadHigh={this.state.thresholdBadHigh}
          thresholdBadSecondHigh={this.state.thresholdBadSecondHigh}
          thresholdGood={this.state.thresholdGood}
          report7days={this.state.report7days}
          modal_for_7_days={this.state.modal_for_7_days}
          device_for_report={this.state.device_for_report}
          report_radio_value={this.state.report_radio_value}
          search_value={this.state.search_value}
          search_return={this.state.search_return}
          graph_display_value={this.state.graph_display_value}
          onSearch={this.onSearch}
          onChangeDatePicker={this.onChangeDatePicker}
          onClickToChangeGraph={this.onClickToChangeGraph}
          selected_device_location={this.props.selected_device_location}
          onChangeSlider={this.onChangeSlider}
          onClickLogoutButton={this.onClickLogoutButton}
          getReportByRange={this.getReportByRange}
          onChangeReportRadio={this.onChangeReportRadio}
          onNextDateSelect={this.onNextDateSelect}
          onPreviousDateSelect={this.onPreviousDateSelect}
          modal_visible={this.state.modal_visible}
          onClick7DayReport={this.onClick7DayReport}
          onClickReportButton={this.onClickReportButton}
          onClickOkModal={this.onClickOkModal}
          onClickCancelModal={this.onClickCancelModal}
          onChangeSelectForReport={this.onChangeSelectForReport}
          onClickCloseOnMiniReportModal={this.onClickCloseOnMiniReportModal}
        />
      </div>
    )
  }
}
const mapActionToProps = {
  ChangeDateAction: ChangeDateAction,
  FetchDeviceAction: FetchDeviceAction,
  ChangeDeviceAction: ChangeDeviceAction,
  FetchReportAction: FetchReportAction,
  UserLogoutFunction:UserLogoutFunction
}
const mapStateToProps = state => ({
  daily_data: state.FetchDailyDataReducer,
  selected_date: state.ChangeDateReducer.selected_date,
  device_list: state.FetchDeviceReducer.device_list,
  loading: state.FetchDeviceReducer.loading,
  report7days: state.Fetch7DaysReducer,
  logged_in:state.UserLoginReducer.logged_in,
  selected_device_location:state.ChangeDeviceReducer.device_location,
  selected_device:state.ChangeDeviceReducer.current_device,
  installation_date:state.ChangeDeviceReducer.installation_date
})

export default connect(
  mapStateToProps,
  mapActionToProps
)(DashboardContainer)
