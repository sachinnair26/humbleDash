import React, { Component } from "react";
import { Table, Spin } from "antd";
import "./DeviceTable.css";
import { connect } from "react-redux";
class DeviceTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      footfall: {},
      userDelight: "",
      currentDevice: "",
      data1: [],
      spin:true,
      value:1,
      search:[],
      columns: [
        {
          title: "Location",
          dataIndex: "location",
          key: "location",
          className: "userdeilght"
        },
        {
          title: "DeviceName",
          dataIndex: "devicename",
          key: "devicename",
          className: "deviceName"
        },
        {
          title: "FootFall",
          dataIndex: "footfall",
          key: "footfall",
          className: "footfall",
          sorter: (a, b) => a.footfall - b.footfall
        },
        {
          title: "Mean",
          dataIndex: "userdelight",
          key: "userdelight",
          className: "userdeilght",
          defaultSortOrder: "descend",
          sorter: (a, b) => a.userdelight - b.userdelight
        }
      ]
    };
  }
  
  static getDerivedStateFromProps(props, state){
    if(props.device !==state.device){
      return{
        data1:props.device,spin:false
      }
    }
  }
  // componentDidUpdate(prevProps,prevState){
  //   console.log(this.props.device,prevProps.device);
    
  //   if(this.props.device !== prevProps.device){
  //     this.setState({spin:false})
  //   }

  // }

  onSearch(e) {                           //this function is used for search
  if(e.target.value.length >0 ){
    this.setState({value:2})
  }
  
  this.setState({
    search: this.state.data1.filter(function(el) {
      if (!el.location) {
      } else {
        return (
          el.location.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
          );
        }
      })
    });
   
    
  }
  render() {
    return (
      <div className="table">
        <div>
          <span>
            <input
              placeholder="Search Devices"
              onChange={this.onSearch.bind(this)}
            />
          </span>
           <Table
            size="small"
            pagination={{ pageSize: 10 }}
            style={{ overflow: "auto" }}
            onRow={record => {
              return {
                onClick: () => {
                  this.setState({ currentDevice: record.devicename});
                  this.props.getData(record.devicename,record.location);
                  this.props.onClickToShowDrawer();
                }
              };
            }}
            columns={this.state.columns}
            dataSource={this.state.value === 1 ? this.state.data1 :this.state.search}
            loading={this.state.spin}
          /> 
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => (
  console.log(state),
  {
    device:state.device
  }
);

export default connect(
  mapStateToProps,
)(DeviceTable);
