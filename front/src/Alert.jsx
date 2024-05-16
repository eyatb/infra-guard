import React, { useState, useEffect } from 'react';
import './Alert.css';

const Alert = () => {
  const [highTemperatures, setHighTemperatures] = useState(null);
  const [lowTemperatures, setLowTemperatures] = useState(null);
  const [highHumidities, setHighHumidities] = useState(null);
  const [lowHumidities, setLowHumidities] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const response1 = await fetch('http://localhost:8081/alert1');
      const response2 = await fetch('http://localhost:8081/alert2');

      if (response1.ok && response2.ok) {
        const data1 = await response1.json();
        const data2 = await response2.json();

        setHighTemperatures(data1.highTemperatures);
        setLowTemperatures(data1.lowTemperatures);
        setHighHumidities(data2.highHumidities);
        setLowHumidities(data2.lowHumidities);
      } else {
        throw new Error('Failed to fetch alerts');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='d-flex flex-column align-items-center pt-4'>
      <h2>Latest Alerts</h2>
      <table>
        <thead>
          <tr>
            <th>Component</th>
            <th>Alert</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {highTemperatures && (
            <tr>
              <td>Air Conditioner</td>
              <td>High Temperature</td>
              <td>{highTemperatures[0]} °C</td>
            </tr>
          )}
          {lowTemperatures && (
            <tr>
              <td>Air Conditioner</td>
              <td>Low Temperature</td>
              <td>{lowTemperatures[0]} °C</td>
            </tr>
          )}
          {highHumidities && (
            <tr>
              <td>Air Conditioner</td>
              <td>High Humidity</td>
              <td>{highHumidities[0]} %rH</td>
            </tr>
          )}
          {lowHumidities && (
            <tr>
              <td>Air Conditioner</td>
              <td>Low Humidity</td>
              <td>{lowHumidities[0]} %rH</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Alert;
