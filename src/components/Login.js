import React, { useState } from 'react'
import {useNavigate} from "react-router-dom"
import { useContext } from 'react';
import noteContext from '../context/noteContext';

const Login = () => {
 const[credentials, setCredentials] = useState({email:"", password:""})
 let navigate = useNavigate();
 const context = useContext(noteContext);

 const {showAlert} = context;

const onChange = (e) =>{
    setCredentials({...credentials, [e.target.name]:e.target.value})
}

const handleSubmit = async(e) =>{
    e.preventDefault();
 
    const response = await fetch(`http://localhost:5000/api/auth/login`,{
      method: 'POST',

      headers:{
        'Content-Type': "application/json",
      
      },
      body: JSON.stringify({email:credentials.email, password:credentials.password })
    });
    // return response.json();
const json = await response.json();
// console.log(json.success)
if(json.success){
    //redirect
    localStorage.setItem("token",json.authtoken)
    navigate("/")
    showAlert("Successfully login", "success")
}
else{
  showAlert("invalid credentials", "warning")
}
}


  return (
    <div>
        <form className="my-2" style={{width:"80%", marginLeft:"10px"}} onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label my-2">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" onChange={onChange}/>
   
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label my-2">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={onChange}/>
  </div>
 
  <button type="submit" className="btn btn-primary">Submit</button>
</form>

    </div>
  )
}

export default Login