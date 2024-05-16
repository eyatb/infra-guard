import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const data = {
  labels: ['Green', 'Blue'],
  datasets: [
    {
      data: [ 20, 4],
      backgroundColor: ['#fb607f' , '#d4d4d4'],
      hoverBackgroundColor: ['#42a3e4','#e4e4e4']
    }
  ]
};

const options = {
  maintainAspectRatio: false,
  cutoutPercentage: 70, 
  tooltips: { enabled: false },
  legend: { display: false },
  plugins: {
    doughnutLabel: {
      labels: [
        {
          text: 'My Text Label', 
          font: {
            size: '20' 
          },
          color: '#36A2EB' 
        }
      ]
    }
  }
};

const DonutChart = () => (
  <div style={{ height: '300px', width: '300px' }}>
    <Doughnut data={data} options={options} />
  </div>
);

export default DonutChart;
