import React from 'react'
import Graph from './Graph'
import './index.css'
import { Icon, DatePicker, Button, Modal } from 'antd'
import DeviceTable from './DeviceTable'
import moment from 'moment'
import ReportModal from './ReportModal'
import MiniReport from './MiniReport'
const DashboardPresentational = ({
  good,
  bad,
  average,
  userdelight,
  foot,
  goodCount,
  badCount,
  avgCount,
  total,
  UserDelightCount,
  ChangeDateAction,
  device_list,
  loading,
  ChangeDeviceAction,
  selected_date,
  onNextDateSelect,
  onPreviousDateSelect,
  modal_visible,
  report_radio_value,
  onChangeReportRadio,
  onClickReportButton,
  onClickOkModal,
  onClickCancelModal,
  onChangeSelectForReport,
  device_for_report,
  modal_for_7_days,
  onClick7DayReport,
  report7days,
  onChangeSlider,
  thresholdAvgHigh,
  thresholdAvgSecondHigh,
  thresholdBadHigh,
  thresholdBadSecondHigh,
  thresholdGood,
  getReportByRange,
  onClickCloseOnMiniReportModal,
  onClickLogoutButton,
  selected_device_location,
  search_value,
  search_return,
  onSearch,
  onClickToChangeGraph,
  graph_display_value
}) => {
  var totalCount = avgCount+goodCount+badCount
  var percentgood = Math.round((goodCount/totalCount)*100) || 0;
  var percentaverage = Math.round((avgCount/totalCount)*100) || 0;
  var percentbad =Math.round((badCount/totalCount)*100) || 0;
  return (
    <div className='dashboard-main'>
      <div className='top-bar'>
        <h2>Toilet Monitoring System</h2>
        <Button className='logout-button' onClick={onClickLogoutButton}>
          Logout
        </Button>
      </div>
      <div className='dashboard-internal'>
      <div className='internal-col-1'>
        <div className='device-info' >
        <div className='content1 '>
                <h5>Device Location:</h5>
                <h4>{selected_device_location}</h4>
              </div>

              <div
                className='content1'
                onClick={()=>{onClickToChangeGraph(2)}}
              >
                <h5>UserDelight:</h5>
               <h4>{UserDelightCount}</h4>
              </div>
              <div className='content1' 
               onClick={()=>{onClickToChangeGraph(3)}}
              >
                <h5>Total:</h5>
                <h4>{total}</h4>
              </div>
        </div>
        <div className='barStyle'>
              <span
                className='goodSpan'
                style={{
                  width: percentgood + '%',
                  transition: 'width 1s'
                }}
              >
                {goodCount}
              </span>
              <span
                className='avgSpan'
                style={{
                  width: percentaverage + '%',
                  transition: 'width 1s'
                }}
              >
                {avgCount}
              </span>
              <span
                className='badSpan'
                style={{
                  width:percentbad + '%',
                  transition: 'width 1s'
                }}
              >
                {badCount}
              </span>
            </div>
        <div className='graph' onClick={()=>{onClickToChangeGraph(1)}}>
          <Graph good={good} bad={bad} average={average}   
          graph_display_value={graph_display_value} 
          userdelight={userdelight} foot={foot}
          />
        </div>
      </div>
      <div className="internal-col-2">
      <div className='red-button-for-report' onClick={onClickReportButton}>
          Generate Report
          </div>
        <div className='table-dateselector'>
          
            <div className='dateselector-arrows'>
              <Icon type='left' onClick={onPreviousDateSelect} />
              <DatePicker
                onChange={(date, dateString) => {
                  ChangeDateAction(date)
                }}
                value={moment(selected_date)}
              />
              <Icon type='right' onClick={onNextDateSelect} />
            </div>
            <DeviceTable
              device_list={device_list}
              loading={loading}
              ChangeDeviceAction={ChangeDeviceAction}
              onClick7DayReport={onClick7DayReport}
              search_value={search_value}
              search_return={search_return}
              onSearch={onSearch}
            />
      </div>
        </div>
      </div>

      <Modal
        visible={modal_for_7_days}
        footer={[
          <Button onClick={onClickCloseOnMiniReportModal}>Close</Button>
        ]}
        width={(window.innerWidth * 60) / 100}
        onCancel={onClickCloseOnMiniReportModal}
      >
        <MiniReport
          good={report7days.good}
          bad={report7days.bad}
          location={report7days.location}
          average={report7days.average}
          dateList={report7days.dateList}
          device={report7days.device}
          onChangeSlider={onChangeSlider}
          thresholdAvgHigh={thresholdAvgHigh}
          thresholdAvgSecondHigh={thresholdAvgSecondHigh}
          thresholdBadHigh={thresholdBadHigh}
          thresholdBadSecondHigh={thresholdBadSecondHigh}
          thresholdGood={thresholdGood}
        />
      </Modal>
      <ReportModal
        modal_visible={modal_visible}
        onClickOkModal={onClickOkModal}
        onClickCancelModal={onClickCancelModal}
        report_radio_value={report_radio_value}
        onChangeReportRadio={onChangeReportRadio}
        device_list={device_list}
        getReportByRange={getReportByRange}
        device_for_report={device_for_report}
        onChangeSelectForReport={onChangeSelectForReport}
      />
    </div>
  )
}
export default DashboardPresentational
