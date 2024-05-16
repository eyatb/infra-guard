import React from 'react';
import { Bar } from 'react-chartjs-2';

const Performancechart = () => {
  const data = {
    labels: ['January', 'February', 'March','April'],
    datasets: [
      {
        label: 'Overall Performance',
        data: [90, 88, 81,95],
        backgroundColor: ['#36A2EB', '#FFC107', '#50C878','#FF8C00'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 5,
        },
      },
    },
  };

  return (
    <div style={{ height: '330px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Performancechart;
