import 'chart.js/auto';
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import moment from "moment";

function Chart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/temp')
      .then(response => response.json())
      .then(data => {setData(data)}) 
      .catch(error => console.error(error));
  }, []);

  const formattedData = data.map(item => ({
    Time: moment(item.Time).format('MMMM Do YYYY, h:mm:ss a'),
    Temperature: item.Temperature,
  }));

  const chartData = {
    labels: formattedData.map(item => item.Time),
    datasets: [
      {
        label: 'Temperature',
        data: formattedData.map(item => item.Temperature),
        fill: false,
        backgroundColor: '#F9429E',
        borderColor: '#F9429E',
      },
    ],
  };

  return (
    <div>
      <Line
        data={chartData}
        options={{
          scales: {
            xAxes: [
              {
                type: 'time',
                time: {
                  displayFormats: {
                    hour: 'MMM D YYYY, h:mm:ss a' // Modified time format
                  }
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Time'
                }
              }
            ],
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: 'Temperature (°C)'
                }
              }
            ]
          }
        }}
      />
    </div>
  );
}

export default Chart;
