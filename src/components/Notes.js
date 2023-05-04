import React, {useContext, useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom"
import noteContext from '../context/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useRef } from 'react';

const Notes = () => {
const context = useContext(noteContext);
const {notes, setNotes, getNotes,addNote,editNote} = context;
const [addnotes, setAddnotes] = useState({id:"" ,etitle:"", edescription:"", etag: ""})
let navigate = useNavigate();
useEffect(()=>{
  if(localStorage.getItem("token")){
  getNotes()
  }
  else{
    navigate("/")
  }
},[])
const ref = useRef(null)
const refClose = useRef(null)
const updateNote =(note) =>{
ref.current.click();
// addNote(note.title, note.description, note.tag );
setAddnotes({id: note._id, etitle: note.title, edescription: note.description, etag:note.tag })
}

const handleClick = (e)=>{
  e.preventDefault();
  ref.current.click();
  editNote(addnotes.id, addnotes.etitle, addnotes.edescription ,addnotes.etag)
    
}
const onChange =(e)=> {
    setAddnotes({
...addnotes, [e.target.name]: e.target.value
   })
    }
  return (
    <>
    <AddNote/>
    {/* <!-- Button trigger modal --> */}
<button style={{display: "none"}} ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

{/* <!-- Modal --> */}
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
    <input type="text" className="form-control"  name="etitle" value={addnotes.etitle} onChange={onChange} minLength={2} required />
   
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">description</label>
    <input type="text" className="form-control"  name="edescription" value={addnotes.edescription} onChange={onChange} minLength={3} required  />
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">tag</label>
    <input type="text" className="form-control"  name="etag" value={addnotes.etag} onChange={onChange}  />
  </div>
      </div>
      <div className="modal-footer">
        <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled={addnotes.etitle.length<3 || addnotes.edescription.length<3}  type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
      </div>
    </div>
  </div>
</div>
    <div className='container my-3'>
      
      <h2>your Notes</h2>  
      <div className='container'>
       {notes.length === 0 && "No notes to display"}
      </div>
      {notes.map((note)=>{
        // console.log(note)
        return <NoteItem note={note} updateNote={updateNote} key={note._id}/>;
      })} 
    </div>
    </>
  )
}

export default Notes