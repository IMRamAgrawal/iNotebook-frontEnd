import React, { useEffect } from 'react';
import {Link, useLocation} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import '../App.css';

export const Navbar = () => {
let location = useLocation();
let navigate = useNavigate();
const handleLogout= ()=>{
  localStorage.removeItem("token")
  navigate("/login")
}
useEffect(()=>{
        // console.log(location.pathname);
    },[location])
    
  
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Navbar</a>
    
    <div className="navbar-collapse">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
       
         <Link className={`nav-link ${location.pathname === "/"? "active" : ""}`} to="/">Home</Link>
      
        </li>

      
        
      </ul>
      {!localStorage.getItem("token")?<form className='App'>
      <Link  to="/login" className="btn btn-primary mx-1">Login</Link>
      <Link  to="/signup" className="btn btn-primary mx-1">SignUp</Link>
      </form>:<button onClick={handleLogout} className='btn btn-primary App'>Logout</button>}
    </div>
  </div>
</nav>
    </div>
  )
}
