import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';

export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    password: "",
    email: "",
    location: ""
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailResponse = await fetch("http://localhost:5000/api/checkemail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email: credentials.email })
  });

  const emailJson = await emailResponse.json();
  if (!emailJson.available) {
    // Email is already registered
    alert("Email is already registered.");
    return;
  }
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: credentials.name,
        password: credentials.password,
        email: credentials.email,
        location: credentials.location
      })
    });

    const json = await response.json();
    console.log(json);
    if (!json.success) {
      alert("Enter Valid Credentials!!!");
    }

    if (json.success) {
      navigate("/login");
    }
  }

  const handleChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await response.json();
          const address = data.display_name;
          setCredentials({ ...credentials, location: address });
        } catch (error) {
          console.error(error);
        }
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  return (
    <div>
      <div className='signuppage'>
        <Navbar />
        <div className='container mt-5' style={{ minHeight: '100vh' }}>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" name="name" value={credentials.name} placeholder='Enter your name' onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter your E-mail address' name='email' value={credentials.email} onChange={handleChange} />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" className="form-control" name='password' value={credentials.password} placeholder='Enter your Password' onChange={handleChange} />
            </div>
            <label htmlFor="location" className="form-label">Location</label>
            <div className="mb-3 locatio">
              <input type="text" className="form-control" name="location" value={credentials.location} placeholder='Enter your Location' onChange={handleChange} />
              <button className="btn btn-success" type="button" onClick={getCurrentLocation}><GpsFixedIcon/> Use my current location</button>
            </div>
            <div>
              <button type="submit" className="btn btn-success">Submit</button>
              <Link to="/login" className='ms-2 btn btn-danger'>Already A User</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
