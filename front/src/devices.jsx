import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Devices() {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/getdevices')
      .then(res => {
        if (res.data.Status === "Success") {
          setDevices(res.data.Result);
        } else {
          alert("Error");
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8081/deletedevice/${id}`)
      .then(res => {
        if (res.data.Status === "Success") {
          window.location.reload(true);
        } else {
          alert("Error");
        }
      })
      .catch(err => console.log(err.response.data));
  };

  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-center mt-2'>
        <h3>Devices List</h3>
      </div>
      <Link to="/createdevice" className='btn btn-success'>Add Device</Link>
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Brand</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device, index) => (
              <tr key={index}>
                <td>{device.name}</td>
                <td>{device.brand}</td>
                <td>
                  <Link to={`/deviceEdit/${device.id}`} className='btn btn-primary btn-sm me-2'>Edit</Link>
                  <button onClick={() => handleDelete(device.id)} className='btn btn-sm btn-danger'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Devices;
