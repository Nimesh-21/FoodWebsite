import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar';

import { useNavigate } from 'react-router-dom';
export default function Login() {
  const [credentials,setCredentials]=useState({password:"",email:""});
  const navigate=useNavigate();
  const handleSubmit= async(e)=>{
    e.preventDefault();
    const response=await fetch("http://localhost:5000/api/login",
    {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({password:credentials.password,email:credentials.email})
    });
   
    const json=await response.json();
    console.log(json);
    if(!json.success)
    alert("Enter Valid Credentials!!!");
    if(json.success){
      localStorage.setItem("userEmail",credentials.email);
      localStorage.setItem("authToken",json.authToken);
      navigate("/");
    }

    
  }

  const handleChange=(event)=>{
    setCredentials({...credentials,[event.target.name]:event.target.value})
  }
 
  return (
    <div className='loginpage'>
    <Navbar/>
    <div className='container d-flex justify-content-center align-items-center' style={{ minHeight: '100vh' }} >
        <form onSubmit={handleSubmit} className='w-50 mx-auto ms-6 border p-4'>
  <div className="mb-3 w-75 ">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter your registered E-mail address' name='email' value={credentials.email} onChange={handleChange}/>
  
  </div>
  <div className="mb-3 w-75">
    <label htmlFor="exampleInputPassword1" className="form-label ">Password</label>
    <input type="password" className="form-control" name='password' value={credentials.password} placeholder='Enter your Password' onChange={handleChange}/>
  </div>


  <button type="submit" className="btn btn-success ">Submit</button>
  <Link to="/createuser" className='ms-2 btn btn-danger'>New User?</Link>
</form>
    </div>
    </div>
  )
}
