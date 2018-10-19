import React, { Component } from "react";
import { Table, Spin } from "antd";
import { db } from "./config";
import "./DeviceTable.css";
export default class DeviceTable extends Component {
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
          title: "DeviceName",
          dataIndex: "devicename",
          key: "devicename",
          className: "deviceName",
          sorter: (a, b) => a.devicename.length - b.devicename.length
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
          dataIndex: "userDelight",
          key: "userDelight",
          className: "userdeilght",
          sorter: (a, b) => a.userDelight - b.userDelight
        },
        {
          title: "Location",
          dataIndex: "location",
          key: "location",
          className: "userdeilght",
          sorter: (a, b) => a.location - b.location
        }
      ]
    };
  }

  componentDidMount() {
    this.setState({ data1: [] });
    var that = this;
    var footfall = {};
    var data1 = [];
    var id = 0;
    var userDelight = {};
    db.ref("new_data")
      .child("AIMSKOCHI")
      .on("value", function(data) {
        data.forEach(a => {
          id = id + 1;
          var count = 0;
          var userdelight = 0;
          a.forEach(q => {
            count = count + 1;
            if (q.val().good === 1) {
              userdelight = userdelight + 1;
            } else if (q.val().average === 1) {
              userdelight = userdelight + 0.5;
            } else {
              userdelight = userdelight + 0;
            }
          });
          data1.push({
            key: id,
            devicename: a.key,
            footfall: count,
            userDelight: userdelight
          });
        });
        db.ref("deviceDetails")
          .child("AIMSKOCHI")
          .on("value", function(data) {
            data.forEach(h => {
              data1.forEach(l => {
                if (l.devicename === h.key) {
                  l["location"] = h.val().Location;
                }
              });
            });
            that.setState({ data1 });
          });
        console.log(data1);

        that.setState({ footfall, userDelight, spin: false });
      });
  }
  onSearch(e) {
    this.state.data1.filter(el => {
      el.devicename.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0;
    });
  }
  render() {
    return (
      <div className="table">
        <div>
          <span>
            Search:{" "}
            <input placeholder="search " onChange={this.onSearch.bind(this)} />
          </span>
          <Table
            bordered
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
            loading={this.state.spin}
          />
          {/* <table>
            <tbody> 
              <tr>
                <th>DeviceName</th>
                <th>Footfall</th>
                <th>UserDelight</th>
              </tr>
              {this.state.data1.map(e => (
                <tr key={e.key}>
                  <td>{e.devicename}</td>
                  <td>{e.footfall}</td>
                  <td>{e.userDelight} </td>
                </tr>
              ))}
            </tbody>
          </table> */}
        </div>
      </div>
    );
  }
}
