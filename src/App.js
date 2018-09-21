import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  Card,
  Modal,
  Button,
  DatePicker,
  Table,
  Radio,
  Select,
  Progress,
  Spin
} from "antd";
import { auth } from "./config";
import moment from "moment";
import { connect } from "react-redux";
import fetchDevice from "./fetchDeviceAction";
import fetchData from "./fetchDataAction";
import { getReportData, getData } from "./fetchReportAction";
import Chart from "chart.js";
import fetchOrganisationAction from "./fetchOrganisationAction";
import { Bar, Doughnut } from "react-chartjs-2";
import createHistory from "history/createBrowserHistory";

const Option = Select.Option;
const { RangePicker } = DatePicker;
const history = createHistory({ forceRefresh: true });
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dateList: [],
      UserDelightCount: 0,
      date: new Date().toDateString("YYYY-MM-DD "),
      deviceForReport: "",
      percentbad: "0",
      percentgood: "0",
      percentaverage: "0",
      total: 0,
      currentDevice: this.props.fetch[0],
      footData: {},
      currentGraph: "main",
      UserDelight: {},
      timeavg: {},
      timegood: {},
      timebad: {},
      deviceList: [],
      modalView: false,
      fetch: true,
      Data: {},
      organisationData: [],
      organisation: ""
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      organisationData: props.organisationData,
      organisationsSelectdefault: props.organisationData[0]
    });
    this.setState({ fetch: false });

    this.getDataVal(props.Data);
  }

  componentDidMount() {
    this.props.fetchOrganisationAction();
  }
  handleOrganisationChange(e) {
    console.log(e);
    this.setState({ organisation: e });
    this.props.fetchDevice(e);
  }
  showModal() {
    this.setState({ modalView: true });
  }
  okModal() {
    this.props.getReportData(this.state.dateList, this.state.deviceForReport);
    setTimeout(() => {
      this.props.history.push("/report");
    }, 1000);
    this.setState({ modalView: false, dateList: [] });
  }
  selectDeviceforReport(a) {
    this.setState({ deviceForReport: a });
  }
  cancelModal() {
    this.setState({ modalView: false });
  }
  rangePicker(date, dateString) {
    if (moment(dateString[0]) > moment("2018-05-04")) {
      var dateList = [];
      var currentDate = moment(dateString[0]);
      var stopDate = moment(dateString[1]);
      while (currentDate <= stopDate) {
        this.state.dateList.push(moment(currentDate).format("YYYY-MM-DD"));
        currentDate = moment(currentDate).add(1, "days");
      }
    } else {
      alert("Please choose a valid date");
    }
  }
  dateChange(date, dateString) {
    var date1 = new Date(dateString).toDateString("YYYY-MM-DD");
    this.props.fetchData();
    this.setState({ date: date1, currentGraph: "main", fetch: true });
  }
  selectDevice(currentDevice) {
    this.props.fetchData();
    this.setState({
      currentDevice: currentDevice,
      fetch: true,
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
        for (var j = 1; j <= 24; j++) {
          if (Number(p.lastTimestamp.slice(16, 18)) === j) {
            if (!good[j]) {
              good[j] = 0;
              good[j] = 1;
            } else {
              good[j] = good[j] + 1;
            }
            if (!userdelight[j]) {
              userdelight[j] = 0;
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
      }
      if (p.bad === 1) {
        badCount = badCount + 1;
        for (var j = 1; j <= 24; j++) {
          if (Number(p.lastTimestamp.slice(16, 18)) === j) {
            if (!bad[j]) {
              bad[j] = 0;
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
      }
      if (p.average === 1) {
        avgCount = avgCount + 1;
        UserDelightCount = UserDelightCount + 0.5;
        for (var j = 1; j <= 24; j++) {
          if (Number(p.lastTimestamp.slice(16, 18)) === j) {
            if (!average[j]) {
              average[j] = 0;
              average[j] = 1;
            } else {
              average[j] = average[j] + 1;
            }
            if (!userdelight[j]) {
              userdelight[j] = 0;
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
    var percentgood = Math.round((goodCount / total) * 100);
    var percentbad = Math.round((badCount / total) * 100);
    var percentaverage = Math.round((avgCount / total) * 100);

    this.setState({
      timeavg: average,
      timebad: bad,
      timegood: good,
      percentbad: percentbad,
      percentgood: percentgood,
      percentaverage: percentaverage,
      total: total,
      UserDelight: userdelight,
      UserDelightCount: UserDelightCount
    });
  }

  footFallClick() {
    this.setState({ currentGraph: "foot" });
    var foot = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
      11: 0,
      12: 0,
      13: 0,
      14: 0,
      15: 0,
      16: 0,
      17: 0,
      18: 0,
      19: 0,
      20: 0,
      21: 0,
      22: 0,
      23: 0,
      24: 0
    };

    var footdate = new Date(this.state.date) + "";
    var count = 0;
    this.props.Data.forEach(z => {
      if (footdate.slice(0, 15) === z.lastTimestamp.slice(0, 15)) {
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
    console.log(this.state.organisationData);
    var datafoot = {
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
            ,
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
            ,
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
      datasets: [
        {
          label: "Good",
          backgroundColor: "rgba(10, 167, 69, 0.2)",
          borderColor: "rgba(10,167,69,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(10, 167, 69, 0.4)",
          hoverBorderColor: "rgba(10,167,69,1)",
          data: [
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
            ,
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
            this.state.timegood[23],
            this.state.timegood[24]
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
            ,
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
            this.state.timebad[23],
            this.state.timebad[24]
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
            ,
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
            this.state.timeavg[23],
            this.state.timeavg[24]
          ]
        }
      ]
    };
    var dataRound = {
      labels: ["Good", "Average", "Bad"],
      datasets: [
        {
          data: [
            this.state.percentgood,
            this.state.percentaverage,
            this.state.percentbad
          ],
          backgroundColor: [
            "rgba(10, 167, 69, 0.6)",
            "rgba(255, 193, 7, 0.6)",
            "rgba(205,92,92, 0.6)"
          ]
        }
      ]
    };
    return (
      <div style={{ margin: "auto" }}>
        {this.state.fetch ? (
          <div
            style={{ margin: "auto", textAlign: "center", marginTop: "300px" }}
          >
            <Spin size="large" />
          </div>
        ) : (
          <div>
            <div className="header">
              <h2 style={{ margin: "auto", textAlign: "center" }}>
                Toilet Monitoring System
              </h2>
              <Button type="primary" onClick={this.signOut.bind(this)}>
                LogOut
              </Button>

              <Modal
                title="Report"
                visible={this.state.modalView}
                onOk={this.okModal.bind(this)}
                onCancel={this.cancelModal.bind(this)}
              >
                <RangePicker onChange={this.rangePicker.bind(this)} />
                <Select
                  style={{ width: 200, margin: "auto" }}
                  onChange={this.selectDeviceforReport.bind(this)}
                >
                  {this.props.fetch.map(o => (
                    <Option value={o} key={o}>
                      {o}
                    </Option>
                  ))}
                </Select>
              </Modal>
            </div>
            <div className="content">
              <div className="head2">
                <Card className="content1">
                  <h5>Device Name:</h5>
                  <h2>{this.state.currentDevice}</h2>
                </Card>
                <Card
                  className="content1"
                  onClick={this.UserDelightClick.bind(this)}
                >
                  <h5>UserDelight</h5>
                  <h2>{this.state.UserDelightCount}</h2>
                </Card>
                <Card
                  className="content1"
                  onClick={this.footFallClick.bind(this)}
                >
                  <h5>FootFall:</h5>
                  <h2>{this.state.total}</h2>
                </Card>
              </div>

              <div className="body">
                <div className="graph">
                  <Bar
                    data={
                      this.state.currentGraph === "main"
                        ? datagraph
                        : this.state.currentGraph === "foot"
                          ? datafoot
                          : userdelight
                    }
                    height={480}
                    width={1300}
                    options={{ maintainAspectRatio: false, responsive: true }}
                  />
                </div>

                <div className="table">
                  <div className="selector">
                    <Select
                      placeholder=""
                      onChange={this.handleOrganisationChange.bind(this)}
                      value={this.state.organisation}
                      style={{ width: 200, margin: "auto" }}
                      value={this.state.organisation}
                    >
                      {this.state.organisationData.map(p => (
                        <Option value={p} key={p}>
                          {p}
                        </Option>
                      ))}
                    </Select>
                    <DatePicker
                      size="small"
                      style={{ width: "60%", margin: "auto" }}
                      onChange={this.dateChange.bind(this)}
                      defaultValue={moment(new Date(), "YYYY-MM-DD")}
                      format={"YYYY-MM-DD"}
                    />
                    <Select
                      value={this.state.currentDevice}
                      style={{ width: 200, margin: "auto" }}
                      onChange={this.selectDevice.bind(this)}
                    >
                      {this.props.fetch.map(o => (
                        <Option value={o} key={o}>
                          {o}
                        </Option>
                      ))}
                    </Select>

                    <Button
                      type="primary"
                      style={{ width: "30%", margin: "auto" }}
                      onClick={this.showModal.bind(this)}
                    >
                      Report
                    </Button>
                  </div>
                  <Card className="Doughnut">
                    <Doughnut data={dataRound} />
                  </Card>
                </div>
              </div>
            </div>
            <div className="footer" />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fetch: state.fetch.data,
  report: state.report.dataReport,
  Data: state.Data.dataVal,
  organisationData: state.organisationData.organisationName
});
const mapActionsToProps = {
  fetchDevice: fetchDevice,
  getReportData: getReportData,
  fetchData: fetchData,
  fetchOrganisationAction: fetchOrganisationAction
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(App);
