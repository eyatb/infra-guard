import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function Editadmin() {
  const [data, setData] = useState({
    name: '',
    email: '',
  });
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get('http://localhost:8081/getadmins/' + id)
      .then(res => {
        setData({
          ...data,
          name: res.data.Result[0].name,
          email: res.data.Result[0].email,
        });
      })
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .put('http://localhost:8081/updateadmins/' + id, data)
      .then(res => {
        if (res.data.Status === 'Success') {
          navigate('/admins');
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='d-flex flex-column align-items-center pt-4'>
      <h2>Update Admin</h2>
      <form className="row g-3 w-50" onSubmit={handleSubmit}>
        <div className="col-12">
          <label htmlFor="inputName" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            placeholder="Enter Name"
            autoComplete="off"
            onChange={e => setData({ ...data, name: e.target.value })}
            value={data.name}
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputEmail4" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="inputEmail4"
            placeholder="Enter Email"
            autoComplete="off"
            onChange={e => setData({ ...data, email: e.target.value })}
            value={data.email}
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Update</button>
        </div>
      </form>
    </div>
  );
}

export default Editadmin;
