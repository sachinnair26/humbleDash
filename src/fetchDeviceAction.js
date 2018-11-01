import { FETCH_DEVICE } from "./actionCreator";
import { db, auth } from "./config";

export default function fetchDeviceAction(date, organisation) {
  return dispatch => {
    const data1 = [];
    var id = 0;
    db.ref("dailyStats")
      .child(organisation)
      .on("value", function(data) {
        data.forEach(o => {
          id = id + 1;
          data1.push({
            id: id,
            devicename: o.key
          });
        });
        data1.forEach(u => {
          db.ref("dailyStats")
            .child(organisation)
            .child(u.devicename)
            .orderByKey()
            .equalTo(date + "")
            .on("value", function(value) {
              if (value.val() === null) {
                (u["footfall"] = 0), (u["userdelight"] = 0);
              } else {
                (u["footfall"] = value.val()[date].footfall),
                  (u["userdelight"] = value.val()[date].userdelight);
              }
            });
        });
        var user = auth.currentUser;
        db.ref("deviceDetail")
          .child(user.uid)
          .child(organisation)
          .on("value", function(sat) {
            sat.forEach(y => {
              data1.forEach(q => {
                if (y.key === q.devicename) {
                  q["location"] = y.val().location;
                }
              });
            });
            dispatch({
              type: FETCH_DEVICE,
              value: data1
            });
          });
      });
  };
}
