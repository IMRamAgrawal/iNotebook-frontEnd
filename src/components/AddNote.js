import React, { useState } from 'react'
import { useContext } from 'react';
import noteContext from '../context/noteContext';

const AddNote = () => {
const context = useContext(noteContext);

const {notes, setNotes, addNote} = context;

const [addnotes, setAddnotes] = useState({title:"", description:"", tag: ""})
const handleClick = (e)=>{
  e.preventDefault();
    addNote(addnotes.title, addnotes.description, addnotes.tag );
    setAddnotes({title:"", description:"", tag: ""})
}
const onChange =(e)=> {
    setAddnotes({
...addnotes, [e.target.name]: e.target.value
   })
    }
// console.log(addnote)

  return (

    <div style={{width:"80%", margin:"20px"}}>
         <h2>Add a Note</h2>
        <form className="my-3" action="">
     
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
    <input type="text" className="form-control"  name="title" value={addnotes.title} onChange={onChange}  />
   
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">description</label>
    <input type="text" className="form-control"  name="description" value={addnotes.description} onChange={onChange}  />
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">tag</label>
    <input type="text" className="form-control"  name="tag" value={addnotes.tag} onChange={onChange}  />
  </div>

  <button disabled={addnotes.title.length<3 || addnotes.description.length<3} type="Submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>

        </form>
    </div>
  )
}

export default AddNote