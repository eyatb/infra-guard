import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Editdevice() {
  const [data, setData] = useState({
    name: '',
    brand: '',
  });
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get('http://localhost:8081/getdevices/' + id)
      .then(res => {
        setData({
          ...data,
          name: res.data.Result[0].name,
          brand: res.data.Result[0].brand,
        });
      })
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .put('http://localhost:8081/updatedevice/' + id, data)
      .then(res => {
        if (res.data.Status === 'Success') {
          navigate('/devices');
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='d-flex flex-column align-items-center pt-4'>
      <h2>Update Device</h2>
      <form className="row g-3 w-50" onSubmit={handleSubmit}>
        <div className="col-12">
          <label htmlFor="inputName" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            placeholder="Enter Device Name"
            autoComplete="off"
            onChange={e => setData({ ...data, name: e.target.value })}
            value={data.name}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputName" className="form-label">
            Brand
          </label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            placeholder="Enter Device Brand"
            autoComplete="off"
            onChange={e => setData({ ...data, brand: e.target.value })}
            value={data.brand}
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Update</button>
        </div>
      </form>
    </div>
  );
}

export default Editdevice;
