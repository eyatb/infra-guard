import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Admins() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/getUsers')
      .then(res => {
        if (res.data.Status === "Success") {
          setUsers(res.data.Result);
        } else {
          alert("Error");
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8081/deleteadmin/${id}`)
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
        <h3>Admins List</h3>
      </div>
      <Link to="/createadmin" className='btn btn-success'>Add Admin</Link>
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((users, index) => (
              <tr key={index}>
                <td>{users.name}</td>
                <td>{users.email}</td>
                <td>
                  <Link to={`/userEdit/` + users.id} className='btn btn-primary btn-sm me-2'>Edit</Link>
                  <button onClick={() => handleDelete(users.id)} className='btn btn-sm btn-danger'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admins;
