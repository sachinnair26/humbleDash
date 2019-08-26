import React from 'react';
import {Table} from 'antd';
import './index.css';
const DeviceTable = (props) =>{
    const columns = [
        {
          title: "Location",
          key: "location",
          className: "userdeilght",
          render:(record)=>{return <div onClick={()=>props.ChangeDeviceAction(record.devicename,record.location)} style={{cursor:'pointer'}}>{record.location}</div>
          }
        },
        {
          title: "Total",
          dataIndex: "footfall",
          key: "footfall",
          className: "footfall",
          sorter: (a, b) => a.footfall - b.footfall
        },
        {
          title: "Mean",
          dataIndex: "userdelight",
          key: "userdelight",
          className: "footfall",
          defaultSortOrder: "descend",
          sorter: (a, b) => a.userdelight - b.userdelight
        },{
          title: "7 Days",
          dataIndex:"",
          key: "x",
          className: "userdeilght",
          render:(record)=>{return <div onClick={()=>{props.onClick7DayReport(record.devicename,record.location)}} style={{cursor:'pointer'}}>Click</div>}
        }
      ]
      
    return(
        <div className="device-table">
             <input
              placeholder="Search Devices"
             onChange={props.onSearch}
            />
            <Table
            rowKey={(record)=>(record.id)}
            size="small"
            pagination={{ pageSize: 10 }}
            style={{ overflow: "auto" }}
            columns={columns}
            dataSource={props.search_value === 1 ? props.device_list :props.search_return}
            loading={props.loading}
          /> 
        </div>
    )
}
export default DeviceTable;