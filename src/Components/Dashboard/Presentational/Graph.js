import React from 'react';
import { Bar } from "react-chartjs-2";


const Graph = ({good,bad,average,graph_display_value,foot,userdelight}) =>{
    var label = [ "12AM-1AM","1AM-2AM","2AM-3AM","3AM-4AM","4AM-5AM","5AM-6AM","6AM-7AM","7AM-8AM",
    "8AM-9AM","9AM-10AM","10AM-11AM","11AM-12PM","12PM-1PM","1PM-2PM","2PM-3PM","3PM-4PM","4PM-5PM",
    "5PM-6PM","6PM-7PM","7PM-8PM","8PM-9PM","9PM-10PM","10PM-11PM","11PM-12AM"]
    var datagraph = {   //this describes everythig like good bad average
        labels:label,
    datasets: [
          {
            label: "Good",
            backgroundColor: "rgba(10, 167, 69, 0.2)",
            borderColor: "rgba(10,167,69,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(10, 167, 69, 0.4)",
            hoverBorderColor: "rgba(10,167,69,1)",
            data:[...good]
            
          },
          {
            label: "Bad",
            backgroundColor: "rgba(205,92,92, 0.2)",
            borderColor: "rgba(205,92,92, 0.2)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data:[...bad]
          },
          {
            label: "Average",
            backgroundColor: "rgba(255, 193, 7, 0.2)",
            borderColor: "rgba(255,193,7,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255, 193, 7, 0.4)",
            hoverBorderColor: "rgba(255,193,7,1)",
            data: [...average]
          }
        ]
      };
      var datafoot = {
        labels: label,
        datasets: [
          {                                                   ///this dataset is for foot fall icluding color of bars and data
            label: "FootFall",
            backgroundColor: "rgba(10, 167, 69, 0.2)",
            borderColor: "rgba(10,167,69,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(10, 167, 69, 0.2)",
            hoverBorderColor: "rgba(10,167,69,1)",
            data: [...foot]
          }
        ]
      };
      var userdelight_data = {                           //this is for representing userdelight
        labels: label,
        datasets: [
          {
            label: "userdelight",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 1,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            data:[...userdelight]
          }
        ]
      };
    return (
        <Bar data={ graph_display_value === 1 ? datagraph : graph_display_value === 2 ? userdelight_data:datafoot}  options={{ maintainAspectRatio: false, responsive: true,scales: {
           yAxes: [{
               ticks: {
                   beginAtZero: true,
                   userCallback: function(label, index, labels) {
                       // when the floored value is the same as the value we have a whole number
                       if (Math.floor(label) === label) {
                           return label;
                       }
  
                   },
               }
           }],
       } }} />
    )
}
export default Graph;