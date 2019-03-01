import {
    FETCH_DATA
} from '../ActionCreators/ActionCreators';
import {
    db
} from '../../config';
export default function FetchDataAction(date, currentDevice, organisation) { //it takes 3 variables date,currentdevice,and oraganisation
    
  
    var date1 = date + " 00:00:01 GMT+0530 (IST)"       //add that string to the date to match it from the firebase
    var date2 = date + " 23:59:59 GMT+0530 (IST)"
    return dispatch => {
        db.ref("new_data")
            .child(organisation+"")
            .child(currentDevice+"")    //now fetch data for that day between 24 hours
            .orderByKey()   
            .startAt(date1)
            .endAt(date2)
            .on("value", function (dataVal) {
                var data = {
                    good: [],
                    bad: [],
                    average: [],
                    userdelight: [],
                    foot:[],
                    goodCount: 0,
                    badCount: 0,
                    avgCount: 0,
                    total: 0,
                    UserDelightCount: 0,
            
                }
                dataVal.forEach(p => {              //once fetch we first arrange footfall with each element as an hour and count is incremented
                    if(date === p.val().lastTimestamp.slice(0,15)){
                        for(var x=1;x<=24;x++){
                            if (Number(p.val().lastTimestamp.slice(16, 18)) === x) { ///this data will be used in graph
                                if (!data.foot[x]) {
                                  data.foot[x] = 1;
                                } else {
                                  data.foot[x] = data.foot[x] + 1;
                                }
                              } else {
                                if (!data.foot[x]) {
                                  data.foot[x] = 0;
                                } else {
                                  data.foot[x] = data.foot[x] + 0;
                                }
                              }
                        }
                    }
                    data.total = data.total + 1; 
                    if (p.val().good === 1) {           //now we check thwe data for good bad and average and add userdelight 
                        data.goodCount = data.goodCount + 1;
                        data.UserDelightCount = data.UserDelightCount + 1;      
                        for (var j = 0; j < 24; j++) {             //for good it is an arrary of with each element as 24 hours and each element has a value equal to zero
                            if (Number(p.val().lastTimestamp.slice(16, 18)) === j) {    //we check for the hour from the fetched data with the array and increment the value at that hour
                                if (!data.good[j]) {
                                    data.good[j] = 1;
                                } else {
                                    data.good[j] = data.good[j] + 1;
                                }
                                if (!data.userdelight[j]) {         //like good,bad and average and userdelights are also done 
                                    data.userdelight[j] = 1;
                                } else {
                                    data.userdelight[j] = data.userdelight[j] + 1;
                                }
                            } else {
                                if (!data.good[j]) {
                                    data.good[j] = 0;
                                } else {
                                    data.good[j] = data.good[j] + 0;
                                }
                                if (!data.userdelight[j]) {
                                    data.userdelight[j] = 0;
                                } else {
                                    data.userdelight[j] = data.userdelight[j] + 0;
                                }
                            }
                        }
                    } else if (p.val().bad === 1) {
                        data.badCount = data.badCount + 1;
                        for (var j = 0; j < 24; j++) {
                            if (Number(p.val().lastTimestamp.slice(16, 18)) === j) {
                                if (!data.bad[j]) {
                                    data.bad[j] = 1;
                                } else {
                                    data.bad[j] = data.bad[j] + 1;
                                }
                                if (!data.userdelight[j]) {
                                    data.userdelight[j] = 0;
                                } else {
                                    data.userdelight[j] = data.userdelight[j] + 0;
                                }
                            } else {
                                if (!data.bad[j]) {
                                    data.bad[j] = 0;
                                } else {
                                    data.bad[j] = data.bad[j] + 0;
                                }
                                if (!data.userdelight[j]) {
                                    data.userdelight[j] = 0;
                                } else {
                                    data.userdelight[j] = data.userdelight[j] + 0;
                                }
                            }
                        }
                    } else if (p.val().average === 1) {
                        data.avgCount = data.avgCount + 1;
                        data.UserDelightCount = data.UserDelightCount + 0.5;
                        for (var j = 0; j < 24; j++) {
                            if (Number(p.val().lastTimestamp.slice(16, 18)) === j) {
                                if (!data.average[j]) {
                                    data.average[j] = 1;
                                } else {
                                    data.average[j] = data.average[j] + 1;
                                }
                                if (!data.userdelight[j]) {
                                    data.userdelight[j] = 0.5;
                                } else {
                                    data.userdelight[j] = data.userdelight[j] + 0.5;
                                }
                            } else {
                                if (!data.average[j]) {
                                    data.average[j] = 0;
                                } else {
                                    data.average[j] = data.average[j] + 0;
                                }
                                if (!data.userdelight[j]) {
                                    data.userdelight[j] = 0;
                                } else {
                                    data.userdelight[j] = data.userdelight[j] + 0;
                                }
                            }
                        }
                    }

                });
                dispatch({
                    type: FETCH_DATA,
                    data: data
                });
            });
    };
}