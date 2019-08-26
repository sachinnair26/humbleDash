import {FETCH_DAILY_DATA} from '../ActionCreator';
import {db} from '../../config';

export default function FetchDailyDataAction(todays_date,current_device){
    
    var date1 = todays_date + " 00:00:01 GMT+0530 (IST)"       //add that string to the date to match it from the firebase
    var date2 = todays_date + " 23:59:59 GMT+0530 (IST)"
    return (dispatch,getState) =>{
        var organisation = getState().UserLoginReducer.organisation
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
        db.ref("new_data")
            .child(organisation+"")
            .child(current_device+"")    //now fetch data for that day between 24 hours
            .orderByKey()   
            .startAt(date1)
            .endAt(date2)
            .on("value", function (dataVal) {
                
                dataVal.forEach(p => {              //once fetch we first arrange footfall with each element as an hour and count is incremented
                    if(todays_date === p.val().lastTimestamp.slice(0,15)){
                        for(var x=0;x<24;x++){
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
                        for (var k = 0; k < 24; k++) {
                            if (Number(p.val().lastTimestamp.slice(16, 18)) === k) {
                                if (!data.bad[k]) {
                                    data.bad[k] = 1;
                                } else {
                                    data.bad[k] = data.bad[k] + 1;
                                }
                                if (!data.userdelight[k]) {
                                    data.userdelight[k] = 0;
                                } else {
                                    data.userdelight[k] = data.userdelight[k] + 0;
                                }
                            } else {
                                if (!data.bad[k]) {
                                    data.bad[k] = 0;
                                } else {
                                    data.bad[k] = data.bad[k] + 0;
                                }
                                if (!data.userdelight[k]) {
                                    data.userdelight[k] = 0;
                                } else {
                                    data.userdelight[k] = data.userdelight[k] + 0;
                                }
                            }
                        }
                    } else if (p.val().average === 1) {
                        data.avgCount = data.avgCount + 1;
                        data.UserDelightCount = data.UserDelightCount + 0.5;
                        for (var l = 0; l < 24; l++) {
                            if (Number(p.val().lastTimestamp.slice(16, 18)) === l) {
                                if (!data.average[l]) {
                                    data.average[l] = 1;
                                } else {
                                    data.average[l] = data.average[l] + 1;
                                }
                                if (!data.userdelight[l]) {
                                    data.userdelight[l] = 0.5;
                                } else {
                                    data.userdelight[l] = data.userdelight[l] + 0.5;
                                }
                            } else {
                                if (!data.average[l]) {
                                    data.average[l] = 0;
                                } else {
                                    data.average[l] = data.average[l] + 0;
                                }
                                if (!data.userdelight[l]) {
                                    data.userdelight[l] = 0;
                                } else {
                                    data.userdelight[l] = data.userdelight[l] + 0;
                                }
                            }
                        }
                    }

                });
                dispatch({
                    type: FETCH_DAILY_DATA,
                    daily_data: {...data}
                });
            });
     }
}