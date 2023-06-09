import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { Badge } from 'react-bootstrap';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function Navbar() {
  const [cartView,setCartView]=useState(false);
  let data = useCart();
  const navigate=useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem("authToken");
    navigate("/login");
  }
  return (
    <div className='navb'>
        <nav className="navbar navbar-expand-lg navbar-dark">
  <div className="container-fluid">
    <Link className="navbar-brand fs-1 fst-itallic"  to="/"><DinnerDiningIcon fontSize="large"/>  N's Kitchen</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto mb-2">
        <li className="nav-item">
          <Link className="nav-link fs-4 active mt-1" aria-current="page" to="/">Home</Link>
        </li>
       
       {localStorage.getItem("authToken") ? 
       <li className="nav-item">
          <Link className="nav-link fs-5 active mt-2" aria-current="page" to="/myorder">My Orders</Link>
        </li> :""
       }
      </ul>
      {!localStorage.getItem("authToken") ? 
      <div className="d-flex">
          <Link className="btn bg-white text-success mx-1" to="/login">Login<LoginIcon/></Link>
          <Link className="btn bg-white text-success mx-1" to="/createuser">Signup</Link>
        </div> :
        <div>
        <div className="btn bg-white text-success mx-1" onClick={()=>{setCartView(true)}}>
        <ShoppingCartIcon/>  My Cart {" "}
        {data.length ? <Badge pill bg='danger'>{data.length}</Badge>:null}
        </div>
{cartView ? <Modal onClose={()=>setCartView(false)}><Cart/></Modal> : null}
        <div className="btn bg-white text-danger mx-1" onClick={handleLogout} >Logout<LogoutIcon/></div>
        </div>
       }
       
       
        
    </div>
  </div>
</nav>
    </div>
  )
}
