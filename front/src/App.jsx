import React from 'react'
import Login from './Login'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './Dashboard'
import Employee from './Employee'
import Profile from './Profile'
import Home from './Home'
import AddEmployee from './AddEmployee'
import EditEmployee from './EditEmployee'
import Start from './Start'
import EmployeeDetail from './EmployeeDetail'
import EmployeeLogin from './EmployeeLogin'
import Alert from './Alert'
import  CCTV from './CCTV' 
import Devices from './devices'
import Adddevice from './adddevice'
import Admins from './Admins'
import Addadmin from './Addadmin'
import Editadmin from './Editadmin'
import Editdevice from './editdevice'




function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Dashboard />}>
      <Route path='/employeedetail/:id' element={<EmployeeDetail />}></Route>
        <Route path='' element={<Home />}></Route>
        <Route path='/employee' element={<Employee />}></Route>
        <Route path='/devices' element={<Devices/>}></Route>
        <Route path='/alert' element={<Alert />}></Route>
        <Route path='/cctv' element={<CCTV />}></Route>
        <Route path='/createdevice' element={<Adddevice />}></Route>
       <Route path='/create' element={<AddEmployee />}></Route>
       <Route path='/Admins' element={<Admins />}></Route>
       <Route path='/createadmin' element={<Addadmin />}></Route>
       <Route path='/employeeEdit/:id' element={<EditEmployee />}></Route>
       <Route path='/userEdit/:id' element={<Editadmin />}></Route>
       <Route path='/deviceEdit/:id' element={<Editdevice />}></Route>



      </Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/start' element={<Start />}></Route>
      <Route path='/employeeLogin' element={<EmployeeLogin />}></Route>
  
    </Routes>
    </BrowserRouter>
  )
}

export default App