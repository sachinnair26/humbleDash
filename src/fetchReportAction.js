import { REPORT_DATA } from "./actionCreator.js";
import { db } from "./config";

const ReportData = {
  ReportDataList: {},
  DateList: [],
  done: false
};

export function getData(list, device) {
  return {
    type: REPORT_DATA,
    ReportData: ReportData
  };
}
export function getReportData(organisation, dateList, device) {
  return dispatch => {
    (ReportData.ReportDataList = {}), (ReportData.DateList = []);
    db.ref("new_data")
      .child(organisation)
      .child(device)
      .on("value", function(data) {
        data.forEach(a => {
          var date2 = new Date(a.key) + "";
          for (var i = 0; i < dateList.length; i++) {
            var date1 = new Date(dateList[i]) + "";
            if (date2.slice(0, 15) === date1.slice(0, 15)) {
              if (!ReportData.ReportDataList[date1.slice(0, 15)]) {
                ReportData.ReportDataList[date1.slice(0, 15)] = [];
                ReportData.ReportDataList[date1.slice(0, 15)].push(a.val());
              } else {
                ReportData.ReportDataList[date1.slice(0, 15)].push(a.val());
              }
            }
          }
        });
        ReportData.done = true;
        ReportData.DateList = dateList;
        dispatch(getData());
      });
  };
}
