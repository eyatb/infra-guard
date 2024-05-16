import React from 'react';
import LineChart from './TempChart';
import PieChart from './PduChart';
import Performancechart from './Performancechart';
import LineChart2 from './HumChart';
import Accesslog from './accesslog';

function Home() {
  return (
    <div className='home'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-12 col-sm-6 col-md-4 col-lg-3 p-3 '>
            <div className='d-flex justify-content-between p-4 align-items-center  border  shadow-sm'>
              <i className='bi bi-arrow-up fs-1 text-success'></i>
              <div>
                <span className='fs-5 fw-bold'>UP</span>
                <h2 className='fw-bold'>5</h2>
              </div>
            </div>
          </div>
          <div className='col-12 col-sm-6 col-md-4 col-lg-3 p-3 '>
            <div className='d-flex justify-content-between p-4 align-items-center border  shadow-sm'>
              <i className='bi bi-arrow-down fs-1 text-primary'></i>
              <div>
                <span className='fs-5 fw-bold'>DOWN</span>
                <h2 className='fw-bold'>0</h2>
              </div>
            </div>
          </div>
          <div className='col-12 col-sm-6 col-md-4 col-lg-3 p-3 '>
            <div className='d-flex justify-content-between p-4 align-items-center bg-white border  shadow-sm'>
              <i className='bi bi-tools fs-1 text-danger'></i>
              <div>
                <span className='fs-5 fw-bold'>MAINTENANCE</span>
                <h2 className='fw-bold'>0</h2>
              </div>
            </div>
          </div>
          <div className='col-12 col-sm-6 col-md-4 col-lg-3 p-3'>
            <div className='d-flex justify-content-between p-4 align-items-center bg-white border shadow-sm'>
              <i className='bi bi-exclamation-triangle-fill fs-1 text-warning'></i>
              <div>
                <span className='fs-5 fw-bold'>ALERTS</span>
                <h2 className='fw-bold'>0</h2>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className="row">
            <div className='col-12 col-md-8 '>
              <LineChart />
            </div>
            <div className='col-12 col-md-4 '>
              <PieChart />
            </div>
          </div>
          <div className="row">
            <div className='col-12 col-md-4 '>
              <div className='performance-chart-wrapper'>
                <Performancechart />
              </div>
            </div>
            <div className='col-12 col-md-8 mr-0'>
                <LineChart2 />
              </div>
            
          </div>
          <div className='col-12 '>
            <Accesslog />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
