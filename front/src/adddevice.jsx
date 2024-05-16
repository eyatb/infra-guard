import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddDevice() {
  const [data, setData] = useState({
    name: '',
    brand: '',
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:8081/createdevice', data)
      .then((res) => {
        navigate('/devices');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='d-flex flex-column align-items-center pt-4'>
      <h2>Add Device</h2>
      <form class="row g-3 w-50" onSubmit={handleSubmit}>
        <div class="col-12">
          <label for="inputName" class="form-label">Name</label>
          <input
            type="text"
            class="form-control"
            id="inputName"
            placeholder='Enter Device Name'
            autoComplete='off'
            onChange={e => setData({ ...data, name: e.target.value })}
          />
        </div>
        <div class="col-12">
          <label for="inputName" class="form-label">Brand</label>
          <input
            type="text"
            class="form-control"
            id="inputName"
            placeholder='Enter Device Brand'
            autoComplete='off'
            onChange={e => setData({ ...data, brand: e.target.value })}
          />
        </div>
        <div class="col-12">
          <button type="submit" class="btn btn-primary">Create</button>
        </div>
      </form>
    </div>
  );
}

export default AddDevice;
