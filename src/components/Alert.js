import React from 'react'
import noteContext from '../context/noteContext';
import { useContext } from 'react';

const Alert = () => {
    const context = useContext(noteContext);

const {showAlert, alert, setAlert} = context;
    const capitalize = (word)=>{
        const lower= word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
  return (
    <div style={{height: "50px"}}>
       {alert && <div style={{height: "30px", border:"none",alignItems:"flexStart",backgroundColor:"rgba(0, 94, 255, 0.447)"}}>
       

    <strong>{ capitalize(alert.type)}</strong>: {alert.msg}  
    </div>}
    </div>
  )
}

export default Alert