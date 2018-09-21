import { FETCH_ORGANISATION } from "./actionCreator";
import { db } from "./config";

export default function fetchOrganisation() {
  var organisationData = [];

  return dispatch => {
    db.ref("new_data").on("value", function(dataVal) {
      dataVal.forEach(a => {
        organisationData.push(a.key + "");
      });
      console.log(organisationData);
      dispatch({
        type: FETCH_ORGANISATION,
        organisationData
      });
    });
  };
}
