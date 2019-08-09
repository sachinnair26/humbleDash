import {FETCH_DEVICE} from '../ActionCreators/ActionCreators';
import {auth,db} from '../../config';
export default function FetchDeviceAction(date, organisation,uid) { //takes 3 values date ,organisatrion,and uid of the use
    
    return dispatch => {
      var id = 0;
      db.ref("dailyStats")  
        .child(organisation)
        .on("value", function(data) {   //now from this node of firebsae data is fetched that is devicename
          var deviceData = [];
          data.forEach(o => {
            id = id + 1;
            deviceData.push({
              id: id,
              devicename: o.key,
            });
          });
          deviceData.forEach(u => {     //now from the array of devices we take each device and compare
            db.ref("dailyStats")
              .child(organisation)
              .child(u.devicename)
              .orderByKey()
              .equalTo(date + "")
              .on("value", function(value) {
                
                if (value.val() === null) { // if for the coming date value is null it defines it as 0
                  u["footfall"] = 0 
                  u["userdelight"] = 0
                } else {
                  u["footfall"] = value.val()[date].footfall
                    u["userdelight"] = value.val()[date].userdelight // now form the array from above that is deviceData footfall and userdelight is added
                }
              });
          });
          db.ref("deviceDetail")      //now from this node we fetch the location of the device and put it in deviceData
            .child(uid)
            .child(organisation)
            .on("value", function(sat) {
              sat.forEach(y => {
                deviceData.forEach(q => {
                  if (y.key === q.devicename) {
                    q["location"] = y.val().location;
                  }
                });
              });
              console.log(deviceData);
              
              dispatch({
                type: FETCH_DEVICE,
                 deviceData
              });
            });
        });
    };
  }
  