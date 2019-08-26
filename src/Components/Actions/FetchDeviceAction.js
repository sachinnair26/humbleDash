import {FETCH_DEVICE} from '../ActionCreator';
import {db} from '../../config';
import ChangeDeviceAction from './ChangeDeviceAction';
import Fetch7DaysAction from './Fetch7DaysAction';
export default function FetchDeviceAction(date){
    return (dispatch,getState) => {
        var uid = getState().UserLoginReducer.uid
        var organisation = getState().UserLoginReducer.organisation
        var loading = true
        var id = 0;
        db.ref("dailyStats")  
          .child(organisation)
          .on("value", function(data) {   //now from this node of firebsae data is fetched that is devicename

            var device_list = [];
            data.forEach(o => {
              if(!getState().Fetch7DaysReducer[o.key]){
                dispatch(Fetch7DaysAction(o.key))
              }
              id = id + 1;
                device_list.push({
                  id: id,
                  devicename: o.key,
                });
            });
            device_list.forEach(u => {     //now from the array of devices we take each device and compare
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
                      u["userdelight"] = value.val()[date].userdelight // now form the array from above that is device_list footfall and userdelight is added
                  }
                });
            });
            db.ref("deviceDetail")      //now from this node we fetch the location of the device and put it in device_list
              .child(uid)
              .child(organisation)
              .on("value", function(sat) {
                sat.forEach(y => {
                  device_list.forEach(q => {
                    if (y.key === q.devicename) {
                      q["location"] = y.val().location;
                      q["installation_date"] =y.val().installation_date
                    }
                  });
                });
                loading = false
                if(getState().ChangeDeviceReducer.current_device === ""){
                  dispatch(ChangeDeviceAction(device_list[0].devicename,device_list[0].location,device_list[0].installation_date))
                }
                dispatch({
                  type:FETCH_DEVICE,
                   device_data:{
                     device_list,
                     loading:loading
                   }
                });
              });
          });
      };
}