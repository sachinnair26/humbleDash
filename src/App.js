import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Modal, Icon, Button, DatePicker, Select, Spin, Radio } from "antd";
import { auth, db } from "./config";
import moment from "moment";
import { connect } from "react-redux";
import fetchDeviceAction from "./fetchDeviceAction";
import fetchData from "./fetchDataAction";
import { getReportData, getData } from "./fetchReportAction";
import { Bar, Doughnut } from "react-chartjs-2";
import createHistory from "history/createBrowserHistory";
import DeviceTable from "./Table";
import b from "./Good.png";
import a from "./Bad.png";
import c from "./Avg.png";
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { RangePicker } = DatePicker;
const history = createHistory({ forceRefresh: true });
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      spin: true,

      dateList: [],
      UserDelightCount: "",
      date: "",
      deviceList: [],
      deviceForReport: "",
      percentbad: "0",
      percentgood: "0",
      percentaverage: "0",
      total: "",
      currentDevice: " ",
      footData: {},
      currentGraph: "main",
      UserDelight: {},
      timeavg: [],
      timegood: [],
      timebad: [],
      labels: [
        "12AM-1AM",
        "1AM-2AM",
        "2AM-3AM",
        "3AM-4AM",
        "4AM-5AM",
        "5AM-6AM",
        "6AM-7AM",
        "7AM-8AM",
        "8AM-9AM",
        "9AM-10AM",
        "10AM-11AM",
        "11AM-12PM",
        "12PM-1PM",
        "1PM-2PM",
        "2PM-3PM",
        "3PM-4PM",
        "4PM-5PM",
        "5PM-6PM",
        "6PM-7PM",
        "7PM-8PM",
        "8PM-9PM",
        "9PM-10PM",
        "10PM-11PM",
        "11PM-12AM"
      ],
      modalView: false,
      Data: {},
      organisation: "",
      goodCount: "",
      badCount: "",
      averageCount: "",
      value: 1
    };
  }
  componentDidMount() {
    // first function

    var organisation = "";
    var that = this;
    auth.onAuthStateChanged(function(aut) {
      if (aut == null) {
        history.push("/");
      } else {
        db.ref("deviceDetail")
          .child(aut.uid)
          .on("value", function(data) {
            data.forEach(z => {
              organisation = z.key;
              that.setState({ organisation: z.key });
              var date1 = new Date().toDateString("YYYY-MM-DD");
              that.props.fetchDeviceAction(date1, z.key); // fetches data for the table
            });
            db.ref("new_data")
              .child(organisation)
              .on("value", function(device) {
                device.forEach(p => {
                  that.state.deviceList.push(p.key);
                });
              });
            that.setState({
              date: moment(new Date(), "YYYY-MM-DD"),
              spin: false
            });
          });
      }
    });
  }

  componentWillReceiveProps(props) {
    this.getDataVal(props.Data);
  }

  getTableData(deviceName) {
    this.setState({ currentDevice: deviceName, currentGraph: "main" });
    var date1 = new Date(this.state.date).toDateString("YYYY-MM-DD");
    this.props.fetchData(date1, deviceName, this.state.organisation);
  }
  modalVisibility() {
    this.setState({ modalView: true });
  }
  handleCancel = () => {
    this.setState({ modalView: false });
  };
  onChangeRadio = e => {
    if (e.target.value === 1) {
      this.selectDateReportWeekly();
      this.setState({ value: e.target.value });
    } else if (e.target.value === 2) {
      this.selectDateReportMonthly();
      this.setState({ value: e.target.value });
    } else if (e.target.value === 3) {
      this.setState({ value: e.target.value });
    }
  };
  selectDateReportRange(date, dateString) {
    if (moment(dateString[0]) > moment("2018-05-04")) {
      var dateList = [];
      var currentDate = moment(dateString[0]);
      var stopDate = moment(dateString[1]);
      while (currentDate <= stopDate) {
        dateList.push(moment(currentDate).format("YYYY-MM-DD"));
        currentDate = moment(currentDate).add(1, "days");
      }
    } else {
      alert("Please choose a valid date");
    }
    this.setState({ dateList });
  }
  selectDateReportMonthly() {
    var dateList = [];
    var todaysDate = moment(new Date()).subtract(1, "days");
    var weekpast = moment(todaysDate).subtract(1, "months");
    while (weekpast <= todaysDate) {
      dateList.push(moment(weekpast).format("YYYY-MM-DD"));
      weekpast = moment(weekpast).add(1, "days");
    }
    this.setState({ dateList });
  }
  selectDateReportWeekly() {
    var dateList = [];
    var todaysDate = moment(new Date()).subtract(1, "days");
    var weekpast = moment(todaysDate).subtract(6, "days");
    while (weekpast <= todaysDate) {
      dateList.push(moment(weekpast).format("YYYY-MM-DD"));
      weekpast = moment(weekpast).add(1, "days");
    }
    this.setState({ dateList });
  }

  onGenerateReport() {
    this.props.getReportData(
      this.state.organisation,
      this.state.dateList,
      this.state.deviceForReport
    );

    this.props.history.push("/report");

    this.setState({ dateList: [] });
  }
  selectDeviceforReport(a) {
    this.setState({ deviceForReport: a });
  }

  previousDayButton() {
    var prevDay = moment(this.state.date).subtract(1, "days");
    this.setState({ date: prevDay });
    var date1 = new Date(prevDay).toDateString("YYYY-MM-DD");
    this.props.fetchData(
      date1,
      this.state.currentDevice,
      this.state.organisation
    );

    this.props.fetchDeviceAction(date1, this.state.organisation);
  }
  nextDayButton() {
    var nextDay = moment(this.state.date).add(1, "days");
    this.setState({ date: nextDay });
    var date1 = new Date(nextDay).toDateString("YYYY-MM-DD");
    this.props.fetchData(
      date1,
      this.state.currentDevice,
      this.state.organisation
    );

    this.props.fetchDeviceAction(date1, this.state.organisation);
  }
  dateChange(date, dateString) {
    var date1 = new Date(dateString).toDateString("YYYY-MM-DD");
    this.props.fetchData(
      date1,
      this.state.currentDevice,
      this.state.organisation
    );
    this.props.fetchDeviceAction(date1, this.state.organisation);
    this.setState({
      date: moment(dateString, "YYYY-MM-DD"),
      currentGraph: "main"
    });
  }

  getDataVal(Data) {
    var good = {};
    var bad = {};
    var userdelight = {};
    var average = {};
    var goodCount = 0;
    var badCount = 0;
    var avgCount = 0;
    var total = 0;
    var UserDelightCount = 0;
    Data.forEach(p => {
      total = total + 1;
      if (p.good === 1) {
        goodCount = goodCount + 1;
        UserDelightCount = UserDelightCount + 1;
        for (var j = 0; j < 24; j++) {
          if (Number(p.lastTimestamp.slice(16, 18)) === j) {
            if (!good[j]) {
              good[j] = 1;
            } else {
              good[j] = good[j] + 1;
            }
            if (!userdelight[j]) {
              userdelight[j] = 1;
            } else {
              userdelight[j] = userdelight[j] + 1;
            }
          } else {
            if (!good[j]) {
              good[j] = 0;
            } else {
              good[j] = good[j] + 0;
            }
            if (!userdelight[j]) {
              userdelight[j] = 0;
            } else {
              userdelight[j] = userdelight[j] + 0;
            }
          }
        }
      } else if (p.bad === 1) {
        badCount = badCount + 1;
        for (var j = 0; j < 24; j++) {
          if (Number(p.lastTimestamp.slice(16, 18)) === j) {
            if (!bad[j]) {
              bad[j] = 1;
            } else {
              bad[j] = bad[j] + 1;
            }
            if (!userdelight[j]) {
              userdelight[j] = 0;
            } else {
              userdelight[j] = userdelight[j] + 0;
            }
          } else {
            if (!bad[j]) {
              bad[j] = 0;
            } else {
              bad[j] = bad[j] + 0;
            }
            if (!userdelight[j]) {
              userdelight[j] = 0;
            } else {
              userdelight[j] = userdelight[j] + 0;
            }
          }
        }
      } else if (p.average === 1) {
        avgCount = avgCount + 1;
        UserDelightCount = UserDelightCount + 0.5;
        for (var j = 0; j < 24; j++) {
          if (Number(p.lastTimestamp.slice(16, 18)) === j) {
            if (!average[j]) {
              average[j] = 1;
            } else {
              average[j] = average[j] + 1;
            }
            if (!userdelight[j]) {
              userdelight[j] = 0.5;
            } else {
              userdelight[j] = userdelight[j] + 0.5;
            }
          } else {
            if (!average[j]) {
              average[j] = 0;
            } else {
              average[j] = average[j] + 0;
            }
            if (!userdelight[j]) {
              userdelight[j] = 0;
            } else {
              userdelight[j] = userdelight[j] + 0;
            }
          }
        }
      }
    });
    var percentgood = Math.round((goodCount / total) * 100) || 0;
    var percentbad = Math.round((badCount / total) * 100) || 0;
    var percentaverage = Math.round((avgCount / total) * 100) || 0;
    this.setState({
      timeavg: average,
      timebad: bad,
      timegood: good,
      percentbad: percentbad,
      percentgood: percentgood,
      percentaverage: percentaverage,
      total: total,
      UserDelight: userdelight,
      UserDelightCount: UserDelightCount,
      goodCount: goodCount,
      badCount: badCount,
      averageCount: avgCount
    });
  }

  footFallClick() {
    this.setState({ currentGraph: "foot" });
    var foot = {};

    var footdate = new Date(this.state.date) + "";

    var count = 0;
    this.props.Data.forEach(z => {
      if (footdate.slice(0, 15) === z.lastTimestamp.slice(0, 15)) {
        for (var x = 0; x < 24; x++) {
          if (z.lastTimestamp.slice(16, 18) === x) {
            if (!foot[x]) {
              foot[x] = 1;
            } else {
              foot[x] = foot[x] + 1;
            }
          } else {
            if (!foot[x]) {
              foot[x] = 0;
            } else {
              foot[x] = foot[x] + 0;
            }
          }
        }
        foot[Number(z.lastTimestamp.slice(16, 18))] =
          foot[Number(z.lastTimestamp.slice(16, 18))] + 1;
      }
    });

    this.setState({ footData: foot });
  }
  UserDelightClick() {
    this.setState({ currentGraph: "userdelight" });
  }
  signOut() {
    auth
      .signOut()
      .then(function() {
        history.push("/");
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  render() {
    var datafoot = {
      labels: this.state.labels,
      datasets: [
        {
          label: "FootFall",
          backgroundColor: "rgba(10, 167, 69, 0.2)",
          borderColor: "rgba(10,167,69,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(10, 167, 69, 0.2)",
          hoverBorderColor: "rgba(10,167,69,1)",
          data: [
            this.state.footData[1],
            this.state.footData[2],
            this.state.footData[3],
            this.state.footData[4],
            this.state.footData[5],
            this.state.footData[6],
            this.state.footData[7],
            this.state.footData[8],
            this.state.footData[9],
            this.state.footData[10],
            this.state.footData[11],
            this.state.footData[12],
            this.state.footData[13],
            this.state.footData[14],
            this.state.footData[15],
            this.state.footData[16],
            this.state.footData[17],
            this.state.footData[18],
            this.state.footData[19],
            this.state.footData[20],
            this.state.footData[21],
            this.state.footData[22],
            this.state.footData[23],
            this.state.footData[24]
          ]
        }
      ]
    };
    var userdelight = {
      labels: this.state.labels,
      datasets: [
        {
          label: "userdelight",
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",

          data: [
            this.state.UserDelight[1],
            this.state.UserDelight[2],
            this.state.UserDelight[3],
            this.state.UserDelight[4],
            this.state.UserDelight[5],
            this.state.UserDelight[6],
            this.state.UserDelight[7],
            this.state.UserDelight[8],
            this.state.UserDelight[9],
            this.state.UserDelight[10],
            this.state.UserDelight[11],
            this.state.UserDelight[12],
            this.state.UserDelight[13],
            this.state.UserDelight[14],
            this.state.UserDelight[15],
            this.state.UserDelight[16],
            this.state.UserDelight[17],
            this.state.UserDelight[18],
            this.state.UserDelight[19],
            this.state.UserDelight[20],
            this.state.UserDelight[21],
            this.state.UserDelight[22],
            this.state.UserDelight[23],
            this.state.UserDelight[24]
          ]
        }
      ]
    };
    var datagraph = {
      labels: this.state.labels,
      datasets: [
        {
          label: "Good",
          backgroundColor: "rgba(10, 167, 69, 0.2)",
          borderColor: "rgba(10,167,69,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(10, 167, 69, 0.4)",
          hoverBorderColor: "rgba(10,167,69,1)",
          data: [
            this.state.timegood[0],
            this.state.timegood[1],
            this.state.timegood[2],
            this.state.timegood[3],
            this.state.timegood[4],
            this.state.timegood[5],
            this.state.timegood[6],
            this.state.timegood[7],
            this.state.timegood[8],
            this.state.timegood[9],
            this.state.timegood[10],
            this.state.timegood[11],
            this.state.timegood[12],
            this.state.timegood[13],
            this.state.timegood[14],
            this.state.timegood[15],
            this.state.timegood[16],
            this.state.timegood[17],
            this.state.timegood[18],
            this.state.timegood[19],
            this.state.timegood[20],
            this.state.timegood[21],
            this.state.timegood[22],
            this.state.timegood[23]
          ]
        },
        {
          label: "Bad",
          backgroundColor: "rgba(205,92,92, 0.2)",
          borderColor: "rgba(205,92,92, 0.2)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          hoverBorderColor: "rgba(255,99,132,1)",
          data: [
            this.state.timebad[0],
            this.state.timebad[1],
            this.state.timebad[2],
            this.state.timebad[3],
            this.state.timebad[4],
            this.state.timebad[5],
            this.state.timebad[6],
            this.state.timebad[7],
            this.state.timebad[8],
            this.state.timebad[9],
            this.state.timebad[10],
            this.state.timebad[11],
            this.state.timebad[12],
            this.state.timebad[13],
            this.state.timebad[14],
            this.state.timebad[15],
            this.state.timebad[16],
            this.state.timebad[17],
            this.state.timebad[18],
            this.state.timebad[19],
            this.state.timebad[20],
            this.state.timebad[21],
            this.state.timebad[22],
            this.state.timebad[23]
          ]
        },
        {
          label: "Average",
          backgroundColor: "rgba(255, 193, 7, 0.2)",
          borderColor: "rgba(255,193,7,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255, 193, 7, 0.4)",
          hoverBorderColor: "rgba(255,193,7,1)",
          data: [
            this.state.timeavg[0],
            this.state.timeavg[1],
            this.state.timeavg[2],
            this.state.timeavg[3],
            this.state.timeavg[4],
            this.state.timeavg[5],
            this.state.timeavg[6],
            this.state.timeavg[7],
            this.state.timeavg[8],
            this.state.timeavg[9],
            this.state.timeavg[10],
            this.state.timeavg[11],
            this.state.timeavg[12],
            this.state.timeavg[13],
            this.state.timeavg[14],
            this.state.timeavg[15],
            this.state.timeavg[16],
            this.state.timeavg[17],
            this.state.timeavg[18],
            this.state.timeavg[19],
            this.state.timeavg[20],
            this.state.timeavg[21],
            this.state.timeavg[22],
            this.state.timeavg[23]
          ]
        }
      ]
    };

    return (
      <div>
        {this.state.spin ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "auto",
              justifyContent: "center",
              height: "100vh"
            }}
          >
            <Spin />
          </div>
        ) : (
          <div style={{ margin: "auto", height: "100vh" }}>
            <div className="header">
              <h2 style={{ margin: "auto", textAlign: "center" }}>
                Toilet Monitoring System
              </h2>
              <Button type="primary" onClick={this.signOut.bind(this)}>
                Logout
              </Button>
            </div>
            <div className="content">
              <div className="left-content">
                <div className="smileys">
                  <div
                    className="goodSmiley"
                    style={{
                      width: this.state.percentgood + "%"
                    }}
                  >
                    <img src={b} width={40} height={40} />
                  </div>
                  <div
                    className="avgSmiley"
                    style={{
                      width: this.state.percentaverage + "%"
                    }}
                  >
                    <img src={c} width={40} height={40} />
                  </div>
                  <div
                    className="badSmiley"
                    style={{
                      width: this.state.percentbad + "%"
                    }}
                  >
                    <img src={a} width={40} height={40} />
                  </div>
                </div>

                <div className="date-table">
                  <div className="datepicker">
                    <Icon
                      style={{ margin: "1px", cursor: "pointer" }}
                      type="left"
                      theme="outlined"
                      onClick={this.previousDayButton.bind(this)}
                    />
                    <DatePicker
                      size="small"
                      onChange={this.dateChange.bind(this)}
                      value={this.state.date}
                      format={"YYYY-MM-DD"}
                      style={{ width: "100%" }}
                    />
                    <Icon
                      style={{ margin: "1px", cursor: "pointer" }}
                      type="right"
                      theme="outlined"
                      onClick={this.nextDayButton.bind(this)}
                    />
                  </div>
                  <DeviceTable
                    date={this.state.date}
                    getdata={this.getTableData.bind(this)}
                    organisation={this.state.organisation}
                  />
                </div>
                <Modal
                  title="Basic Modal"
                  visible={this.state.modalView}
                  onOk={this.onGenerateReport.bind(this)}
                  onCancel={this.handleCancel}
                >
                  <div className="report-select">
                    <RadioGroup onChange={this.onChangeRadio}>
                      <Radio value={1}>By Week</Radio>
                      <Radio value={2}>By Month</Radio>
                      <Radio value={3}>Range</Radio>
                    </RadioGroup>
                    {this.state.value == 3 ? (
                      <RangePicker
                        onChange={this.selectDateReportRange.bind(this)}
                        style={{ width: 200 }}
                      />
                    ) : null}

                    <Select
                      placeholder="Select Davice"
                      onChange={this.selectDeviceforReport.bind(this)}
                      style={{ width: 200 }}
                    >
                      {this.state.deviceList.map(o => (
                        <Option value={o} key={o}>
                          {o}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </Modal>

                <Button
                  onClick={this.modalVisibility.bind(this)}
                  style={{ margin: "auto", display: "flex" }}
                >
                  Report
                </Button>
              </div>

              <div className="other-content">
                <div className="head2">
                  <div className="content1 ">
                    <h5>Device Name:</h5>
                    <h4>{this.state.currentDevice}</h4>
                  </div>

                  <div
                    className="content1"
                    onClick={this.UserDelightClick.bind(this)}
                  >
                    <h5>UserDelight</h5>
                    <h3>{this.state.UserDelightCount}</h3>
                  </div>
                  <div
                    className="content1"
                    onClick={this.footFallClick.bind(this)}
                  >
                    <h5>FootFall:</h5>
                    <h3>{this.state.total}</h3>
                  </div>
                </div>
                <div className="barStyle">
                  <span
                    className="goodSpan"
                    style={{
                      width: this.state.percentgood + "%",
                      transition: "width 1s"
                    }}
                  >
                    {this.state.goodCount}
                  </span>
                  <span
                    className="avgSpan"
                    style={{
                      width: this.state.percentaverage + "%",
                      transition: "width 1s"
                    }}
                  >
                    {this.state.averageCount}
                  </span>
                  <span
                    className="badSpan"
                    style={{
                      width: this.state.percentbad + "%",
                      transition: "width 1s"
                    }}
                  >
                    {this.state.badCount}
                  </span>
                </div>
                <hr style={{ width: "100%" }} />
                <div className="body-graph-main">
                  <div
                    className="graph"
                    onClick={() => {
                      this.setState({ currentGraph: "main" });
                    }}
                  >
                    <Bar
                      data={
                        this.state.currentGraph === "main"
                          ? datagraph
                          : this.state.currentGraph === "foot"
                            ? datafoot
                            : userdelight
                      }
                      options={{ maintainAspectRatio: false, responsive: true }}
                    />
                  </div>
                </div>
              </div>
              <div />
            </div>
            <div className="footer" />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fetchDevice: state.fetchDevice.data,
  report: state.report.dataReport,
  Data: state.Data.dataVal
});
const mapActionsToProps = {
  fetchDeviceAction: fetchDeviceAction,
  getReportData: getReportData,
  fetchData: fetchData
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(App);
