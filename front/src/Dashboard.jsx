import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './dashboard.css';

import 'bootstrap-icons/font/bootstrap-icons.css';
function Dashboard() {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleLogout = () => {
    axios.get('http://localhost:8081/logout')
      .then(() => {
        navigate('/start');
      })
      .catch(err => console.log(err));
  };

  return (
  <div className="dashboard-container">
  <div className="dashboard-row">
    <div className="dashboard-sidebar">
      <div className="sidebar-sticky">
        <h3 className="text-white fs-5 fw-bolder mb-4 ">Infraguard</h3>
        <ul className="dashboard-nav">
          <li className="dashboard-nav-item">
            <Link to="/" className="dashboard-nav-link text-white">
            <i class="bi bi-speedometer"></i>Dashboard
            </Link>
          </li>

          {localStorage.getItem("role") === "admin" &&
           <> 
           <li className="dashboard-nav-item">
            <Link to="/employee" className="dashboard-nav-link text-white">
            <i class="bi bi-person-add"></i>Manage Employees
            </Link>
          </li>
          <li className="dashboard-nav-item">
            <Link to="Admins" className="dashboard-nav-link text-white">
            <i class="bi bi-person-workspace"></i>Manage Admins
            </Link>
          </li>
          <li className="dashboard-nav-item">
            <Link to="/devices" className="dashboard-nav-link text-white">
            <i class="bi bi-gear"></i>Manage Devices
            </Link>
          </li>
          </> }
          
  
          <li className="dashboard-nav-item">
          <Link to="alert" className="dashboard-nav-link text-white">
          <i class="bi bi-exclamation-triangle"></i>Alerts
            </Link>
            </li>

            <li className="dashboard-nav-item">
          <Link to="CCTV" className="dashboard-nav-link text-white">
          <i class="bi bi-camera-video"></i>CCTV
            </Link>
            </li>

            <li className="dashboard-nav-item" style={{marginTop:'11rem'}}>
    <button className="dashboard-logout-btn" onClick={handleLogout}>
      <i className="bi-power me-2"></i>Logout
    </button>
  </li>
        </ul>
      </div>
    </div>
    <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;