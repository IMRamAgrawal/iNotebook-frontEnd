import React from 'react'
import noteContext from "../context/noteContext";
import { useContext } from 'react';

;

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const {deleteNote} = context;
  const {note, updateNote} = props
    // console.log(note)
  return (
   <div>
      <div style={{width:"80%"}} className="card my-4">
  
  <div className="card-body">
    <div className='d-flex align-items-center' style={{flexWrap:"wrap"}}>
    <h5 className="card-title">{note.title}</h5>
   

   <i style={{margin:"20px"}} onClick={()=>{deleteNote(note._id)}} className="fa-solid fa-trash"></i>
   <i onClick={()=>{updateNote(note)}} className="fa-solid fa-pen-to-square"></i>
   </div>
   <p>{props.note.description}</p>
  </div>
</div>

    </div>
  )
}

export default NoteItem