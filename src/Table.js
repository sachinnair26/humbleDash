import React, { Component } from "react";
import { Table, Spin } from "antd";
import { db, auth } from "./config";
import "./DeviceTable.css";
import Login from "./Login";
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
          dataIndex: "userDelight",
          key: "userDelight",
          className: "userdeilght",
          sorter: (a, b) => a.userDelight - b.userDelight
        }
      ]
    };
  }

  componentDidMount() {
    var organisation = this.props.organisation;
    this.setState({ data1: [] });
    var that = this;
    var footfall = {};
    var id = 0;
    var userDelight = {};
    db.ref("new_data")
      .child(organisation)
      .on("value", function(data) {
        var data1 = [];
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
        var user = auth.currentUser;

        db.ref("deviceDetail")
          .child(user.uid)
          .child(organisation)
          .on("value", function(data) {
            data.forEach(l => {
              data1.forEach(g => {
                if (l.key === g.devicename) {
                  g["location"] = l.val().location;
                }
              });
            });

            that.setState({
              data1,
              spin: false
            });
            that.props.getdata(data1[0].devicename);
          });

        that.setState({ footfall, userDelight });
      });
  }
  onSearch(e) {
    var data2 = this.state.data1;
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
            loading={this.state.spin}
          />
        </div>
      </div>
    );
  }
}
