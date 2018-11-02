import React, { Component } from "react";
import { Table, Spin } from "antd";
import { db, auth } from "./config";
import "./DeviceTable.css";
import { connect } from "react-redux";
import fetchDeviceAction from "./fetchDeviceAction";
class DeviceTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      footfall: {},
      userDelight: "",
      dataSource: [],
      spin: true,
      currentDevice: "",
      data1: [],
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
          title: "UserDelight",
          dataIndex: "userdelight",
          key: "userdelight",
          className: "userdeilght",
          defaultSortOrder: "descend",
          sorter: (a, b) => a.userDelight - b.userDelight
        }
      ]
    };
  }
  componentWillReceiveProps(props) {
    this.setState({ data1: props.fetchDevice });
  }

  onSearch(e) {
    this.setState({
      data1: this.state.data1.filter(function(el) {
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
            pagination={{ pageSize: 50 }}
            style={{ overflow: "auto" }}
            onRow={record => {
              return {
                onClick: () => {
                  this.setState({ currentDevice: record.devicename });
                  this.props.getdata(record.devicename);
                }
              };
            }}
            columns={this.state.columns}
            dataSource={this.state.data1}
            loading={this.state.loading}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => (
  console.log(state),
  {
    fetchDevice: state.fetchDevice.data
  }
);
const mapActionsToProps = {
  fetchDeviceAction: fetchDeviceAction
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(DeviceTable);
