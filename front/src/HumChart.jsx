import 'chart.js/auto';
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import moment from "moment";

function LineChart2() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/hum')
      .then(response => response.json())
      .then(data => {
        setData(data);
        console.log(data); 
      }) 
      .catch(error => console.error(error));
  }, []);

  const formattedData = data.map(item => ({
    Time: moment(item.Time).format('MMMM Do YYYY, h:mm:ss a'),
    Humidity: item.Humidity,
  }));

  const chartData = {
    labels: formattedData.map(item => item.Time),
    datasets: [
      {
        label: 'Humidity',
        data: formattedData.map(item => item.Humidity),
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
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
                    hour: 'MMM D YYYY, h:mm:ss a'
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
                  labelString: 'Humidity (%rH)'
                }
              }
            ]
          }
        }}
      />
    </div>
  );
}

export default LineChart2;
