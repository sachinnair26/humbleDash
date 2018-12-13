import { REPORT_DATA } from '../ActionCreators/ActionCreators';
import { db } from '../../config';

const Report = {
  good: [],
  average: [],
  bad: [],
  dateList: [],
};
export function getData() {
  return {
    type: REPORT_DATA,
    Report,
  };
}
export default function FetchReport(dateList, device, organisation) {//takes 3 inputs list of dates,devices ,organisation
  console.log(dateList, device, organisation);
  for(var i = 0 ;i<dateList.length;i++){
    var date1 = new Date(dateList[i])+''  //change the date format 2018-12-02 to Sun Dec 02 2018
    for(let x=1;x<=24;x++){        
      if(!Report.good[date1.slice(0,15)]){    //decalring an empty array of that date 
        Report.good[date1.slice(0,15)] = []
        Report.good[date1.slice(0,15)][x] = 0   //putting all the hours in the array and initializing it to 0
      }
      else{
        Report.good[date1.slice(0,15)][x] = 0
      }
      if(!Report.average[date1.slice(0,15)]){
        Report.average[date1.slice(0,15)] = []
        Report.average[date1.slice(0,15)][x] = 0
      }
      else{
        Report.average[date1.slice(0,15)][x] = 0
      }
      if(!Report.bad[date1.slice(0,15)]){
        Report.bad[date1.slice(0,15)] = []
        Report.bad[date1.slice(0,15)][x] = 0
      }
      else{
        Report.bad[date1.slice(0,15)][x] = 0
      }
       
        
    }
  }
  return (dispatch) => {
    Report.dateList = dateList;
    db
      .ref('new_data')
      .child(organisation)      //fetching the data for report
      .child(device)
      .on('value', function(data) {
        data.forEach((a) => {
          var date2 = new Date(a.key) + '';         //change the key of the data and cahnge it into format Sun Dec 02 2018
          for (var i = 0; i < dateList.length; i++) {
            var date1 = new Date(dateList[i]) + '';
            dateList[i] = date1.slice(0, 15);         //chaging the values in the array of the dates from 2018-12-02 to Sun Dec 02 2018
            if (date2.slice(0, 15) === date1.slice(0, 15)) {  //checking the key and each value of the array
              if (a.val().good === 1) {
                var time1 = new Date(a.val().lastTimestamp) + '';
                var time2 = Number(time1.slice(16, 18));
                for (var x = 1; x <= 24; x++) {
                  if (time2 === x) {
                    Report.good[date2.slice(0,15)][x]  = Report.good[date2.slice(0,15)][x]  + 1 || 0 // if its equal value is inceremented by one else it is left zreo
                  }
                }
              } else if (a.val().average === 1) {
                var time1 = new Date(a.val().lastTimestamp) + '';
                var time2 = Number(time1.slice(16, 18));
                for (var x = 1; x <= 24; x++) {
                  if (time2 === x) {
                   Report.average[date2.slice(0,15)][x] = Report.average[date2.slice(0,15)][x] + 1 || 0 
                  }
                }
              } else if (a.val().bad === 1) {
                var time1 = new Date(a.val().lastTimestamp) + '';
                var time2 = Number(time1.slice(16, 18));
                for (var x = 1; x <= 24; x++) {
                  if (time2 === x) {
                    Report.bad[date2.slice(0,15)][x] =   Report.bad[date2.slice(0,15)][x] + 1 || 0 
                  }
                }
              }
            }
          }
        });
        dispatch(getData());
      });
  };
}
