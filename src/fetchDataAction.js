import { FETCH_DATA } from "./actionCreator";
import { db } from "./config";

export default function fetchData(date, currentDevice, link) {
  var data = [];
  console.log(date, currentDevice, link);
  return dispatch => {
    db.ref("new_data")
      .child(link + "")
      .child(currentDevice + "")
      .orderByKey()
      .startAt(date + " 00:00:01 GMT+0530 (IST)")
      .endAt(date + " 23:59:59 GMT+0530 (IST)")
      .on("value", function(dataVal) {
        dataVal.forEach(a => {
          data.push(a.val());
        });
        dispatch({
          type: FETCH_DATA,
          data: data
        });
      });
  };
}
