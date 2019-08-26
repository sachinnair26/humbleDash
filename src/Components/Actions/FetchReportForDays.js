import { db } from '../../config'

export default function FetchReportForDays (
  dateList,
  device,
  organisation 
) {
  var good = {}
  var bad = {}
  var average = {}
  for (var i = 0; i < dateList.length; i++) {
    var date1 = new Date(dateList[i]) + '' // change the date format 2018-12-02 to Sun Dec 02 2018
    for (let x = 1; x <= 24; x++) {
      if (!good[date1.slice(0, 15)]) {
        // decalring an empty array of that date
        good[date1.slice(0, 15)] = []
        good[date1.slice(0, 15)][x] = 0 // putting all the hours in the array and initializing it to 0
      } else {
        good[date1.slice(0, 15)][x] = 0
      }
      if (!average[date1.slice(0, 15)]) {
        average[date1.slice(0, 15)] = []
        average[date1.slice(0, 15)][x] = 0
      } else {
        average[date1.slice(0, 15)][x] = 0
      }
      if (!bad[date1.slice(0, 15)]) {
        bad[date1.slice(0, 15)] = []
        bad[date1.slice(0, 15)][x] = 0
      } else {
        bad[date1.slice(0, 15)][x] = 0
      }
    }
  }
  return db
    .ref('new_data')
    .child(organisation) // fetching the data for report
    .child(device)
    .once('value')
    .then(function (data) {
      data.forEach(a => {
        var date2 = new Date(a.key) + '' // change the key of the data and cahnge it into format Sun Dec 02 2018
        for (var i = 0; i < dateList.length; i++) {
          var date1 = new Date(dateList[i]) + ''
          dateList[i] = date1.slice(0, 15) // chaging the values in the array of the dates from 2018-12-02 to Sun Dec 02 2018
          if (date2.slice(0, 15) === date1.slice(0, 15)) {
            // checking the key and each value of the array
            if (a.val().good === 1) {
              var time1 = new Date(a.val().lastTimestamp) + ''
              var time2 = Number(time1.slice(16, 18))
              for (var x = 1; x <= 24; x++) {
                if (time2 === x) {
                  good[date2.slice(0, 15)][x] =
                    good[date2.slice(0, 15)][x] + 1 || 0 // if its equal value is inceremented by one else it is left zreo
                }
              }
            } else if (a.val().average === 1) {
              var time1 = new Date(a.val().lastTimestamp) + ''
              var time2 = Number(time1.slice(16, 18))
              for (var x = 1; x <= 24; x++) {
                if (time2 === x) {
                  average[date2.slice(0, 15)][x] =
                    average[date2.slice(0, 15)][x] + 1 || 0
                }
              }
            } else if (a.val().bad === 1) {
              var time1 = new Date(a.val().lastTimestamp) + ''
              var time2 = Number(time1.slice(16, 18))
              for (var x = 1; x <= 24; x++) {
                if (time2 === x) {
                  bad[date2.slice(0, 15)][x] =
                    bad[date2.slice(0, 15)][x] + 1 || 0
                }
              }
            }
          }
        }
      })
    }).then(wish =>{
      const data1 = {
        good: good,
        bad: bad,
        average: average
      }
      return data1
    })
}
