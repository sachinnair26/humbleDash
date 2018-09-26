import { FETCH_DEVICE } from "./actionCreator";
import { db } from "./config";

export default function fetchDevice(link) {
  const value = [];
  return dispatch => {
    db.ref("new_data")
      .child(link + "")
      .once("value")
      .then(function(data) {
        data.forEach(f => {
          value.push(f.key);
        });
        console.log(value);
        dispatch({
          type: FETCH_DEVICE,
          value: value
        });
      });
  };
}
