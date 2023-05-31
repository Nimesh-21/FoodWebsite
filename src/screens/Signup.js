
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [credentials,setCredentials]=useState({name:"",password:"",email:"",location:""});
  const navigate=useNavigate();
  const handleSubmit= async(e)=>{
    e.preventDefault();
    const response=await fetch("http://localhost:5000/api/createuser",
    {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({name:credentials.name,password:credentials.password,email:credentials.email,location:credentials.location})
    });

    const json=await response.json();
    console.log(json);
    if(!json.success)
    alert("Enter Valid Credentials!!!");

    if(json.success)
    navigate("/login");
    
  }

  const handleChange=(event)=>{
    setCredentials({...credentials,[event.target.name]:event.target.value})
  }
  return (
    
    <div>
    <div className='signuppage'>
    <Navbar/>
    <div className='container mt-5' style={{ minHeight: '100vh' }}>
        <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" name="name" value={credentials.name} placeholder='Enter your name' onChange={handleChange}/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter your E-mail address' name='email' value={credentials.email} onChange={handleChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name='password' value={credentials.password} placeholder='Enter your Password' onChange={handleChange}/>
  </div>

  <div className="mb-3">
    <label htmlFor="location" className="form-label">Location</label>
    <input type="text" className="form-control" name="location" value={credentials.location} placeholder='Enter your Location' onChange={handleChange} />
    
  </div>

  <button type="submit" className="btn btn-success ">Submit</button>
  <Link to="/login" className='ms-2 btn btn-danger'>Already A User</Link>
</form>
    </div>
    </div>
    </div>
  )
}
