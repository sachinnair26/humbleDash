import {Modal,DatePicker,Radio,Select} from 'antd';
import React from 'react';
const {RangePicker} = DatePicker;
const { Option } = Select;

const ReportModal = (props) =>{
    return (
        <Modal title='Generate Report' visible={props.modal_visible} 
        onOk={props.onClickOkModal} 
        onCancel={props.onClickCancelModal} >
          <Radio.Group  
          onChange={props.onChangeReportRadio}>
        <Radio value={1}>By Week</Radio>
        <Radio value={2}>By Month</Radio>
        <Radio value={3}>By Range</Radio>
        </Radio.Group>
        {props.report_radio_value === 3 ? <RangePicker onChange={props.getReportByRange}></RangePicker>:null}
        <br/>
        <Select style={{width:'300px'}} 
        onChange={props.onChangeSelectForReport} 
         placeholder="Select Device">
            {props.device_list.map((point,index) =>{
                return(
                    <Option key={index} value={point.devicename}>{point.location}</Option>
                )
            })}
        </Select>
        </Modal>
    )
}

export default ReportModal;