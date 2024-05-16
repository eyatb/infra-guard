import React, { useState } from 'react'
import './login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {

    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    const [error, setError] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/login', values)
        .then(res => {
            if(res.data.Status === 'Success') {
                localStorage.setItem("role","admin");
                navigate('/');
            } else {
                setError(res.data.Error);
            }
        })
        .catch(err => console.log(err));
    }

return (
        <div className='loginPage'>
            <div className='loginForm'>
                <div className='text-danger'>
                    {error && error}
                </div>
                <h2>Admin Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder='Enter Email' name='email' 
                          onChange={e => setValues({...values, email: e.target.value})} className='form-control' autoComplete='off'/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" placeholder='Enter Password' name='password'
                          onChange={e => setValues({...values, password: e.target.value})} className='form-control' />
                    </div>
                    <button type='submit' className='btn btn-success'> Log in</button>
                   
                </form>
            </div>
        </div>
    )
}

export default Login