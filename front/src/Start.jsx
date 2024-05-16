import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

function Start() {
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = 'Infraguard';
  }, []);
  
  return (
    <div className="start">
      <div className='starting'>
        <h2>Welcome!</h2>
        <h3>You're one step away from accessing your dashboard.</h3>
        <h4>Login as:</h4>
        <div className='buttonGroup'>
          <button className='customButton' onClick={e => navigate('/employeeLogin')}>Employee</button>
          <button className='customButton' onClick={e => navigate('/login')}>Admin</button>
        </div>
      </div>
    </div>
  );
}

export default Start;
