import React from 'react'
import {useState} from 'react'
import {useNavigate} from "react-router-dom"
import { useContext } from 'react';
import noteContext from '../context/noteContext';

const SignUp = () => {
  const context = useContext(noteContext);

const {showAlert} = context;
  const[credentials, setCredentials] = useState({name:"", email:"", password:"", cpassword:""})
 let navigate = useNavigate();

const onChange = (e) =>{
    setCredentials({...credentials, [e.target.name]:e.target.value})
}

const handleSubmit = async(e) =>{
    e.preventDefault();
    const {name,email,password} = credentials;
    const response = await fetch(`http://localhost:5000/api/auth/createuser`,{
      method: 'POST',

      headers:{
        'Content-Type': "application/json",
      
      },
      body: JSON.stringify({ name,email,password})
    });
    // return response.json();
const json = await response.json();
// console.log(json.success)
if(credentials.password == credentials.cpassword){
if(json.success){
  //redirect
  localStorage.setItem("token",json.authtoken)
  navigate("/login")
  showAlert("Successfully Registered", "success")
}
else{
  showAlert("Invalid credentials", "warning")
}
}
else{showAlert("password is not match", "warning")}
}
  return (
    <div>
        <div>
        <form className="my-2" style={{width:"80%", marginLeft:"10px"}} onSubmit={handleSubmit}>
        <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label my-2">Name</label>
    <input type="text" className="form-control" id="exampleInputEmail1" name="name"   onChange={onChange} aria-describedby="emailHelp"/>
   
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label my-2">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" name="email"   onChange={onChange} aria-describedby="emailHelp"/>
   
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label my-2">Password</label>
    <input type="password" className="form-control" name="password"  onChange={onChange} id="exampleInputPassword1"/>
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label my-2">Confirm Password</label>
    <input type="password" className="form-control" name="cpassword" onChange={onChange} id="exampleInputPassword1"/>
  </div>
 
  <button disabled={credentials.name.length<3 || credentials.email.length<3} type="submit" className="btn btn-primary">Submit</button>
</form>

    </div>
    </div>
  )
}

export default SignUp