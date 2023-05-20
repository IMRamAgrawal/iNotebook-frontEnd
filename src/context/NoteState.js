import NoteContext from "./noteContext";
import { useState } from "react";
import { BASE_URL } from "../components/helper";

const NoteState = (props)=>{
 
  console.log(BASE_URL)
  // const host = "http://localhost:5000"
const notesinitial = [
//     {
//         "_id": "644ac987937dc8e6786d26bd",
//         "user": "644aa35a9753267b37ac99a9",
//         "title": "New note oye updated",
//         "description": "please access the playlist uddated",
//         "tag": "youTube",
//         "date": "2023-04-27T19:14:15.082Z",
//         "__v": 0
//       },
//       {
//         "_id": "644ac997937dc8e6786d26c3",
//         "user": "644aa35a9753267b37ac99a9",
//         "title": "My Title",
//         "description": "Please wake up early",
//         "tag": "personal",
//         "date": "2023-04-27T19:14:31.072Z",
//         "__v": 0
//       },
//       {
//         "_id": "644ac99f937dc8e6786d26c5",
//         "user": "644aa35a9753267b37ac99a9",
//         "title": "My Title2",
//         "description": "Please wake up early",
//         "tag": "personal",
//         "date": "2023-04-27T19:14:39.225Z",
//         "__v": 0
//       },
]
  const[notes, setNotes] = useState(notesinitial)
  const[alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(()=>{
      setAlert(null);
    },5000)
  }

  // Get all notes
  const getNotes = async() => {
    //API Call
    const url = `${BASE_URL}/api/notes/fetchallnotes`
    
    
    const response = await fetch(`${BASE_URL}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers:{
        'Content-Type': "application/json",
        // "Accept" : "application/json",
        "auth-token": localStorage.getItem("token")
     
      },
     
    });
    const json = await response.json()
    setNotes(json)
  }













// Add a note
// const addNote =(title, description, tag) =>{
  //TODO: API call
  const addNote = async(title, description, tag) =>{
    // API Call
    const url = `${BASE_URL}/api/notes/addnote`
    const response = await fetch(url,{
      method: 'POST',

      headers:{
        'Content-Type': "application/json",
        // "Accept" : "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({title,description,tag})
    });
    // return response.json();
const note = await response.json();
  // const note = {
  //   "_id": "644ac987937dc8e6786d26bd7",
  //   "user": "644aa35a9753267b37ac99a9",
  //   "title": title,
  //   "description":description ,
  //   "tag": tag,
  //   "date": "2023-04-27T19:14:15.082Z",
  //   "__v": 0
  // }
  setNotes(notes.concat(note))
  showAlert("Successfully added note", "success")
  // console.log(notes)
}
// edit a note
const editNote = async(id, title, description, tag) =>{
  // API Call
  const url = `${BASE_URL}/api/notes/updatenote/${id}`
  const response = await fetch(url,{
    method: 'PUT',
    headers:{
      'Content-Type': "application/json",
      "auth-token": localStorage.getItem("token")
    },
    body: JSON.stringify({title,description,tag})
  })
  const json= await response.json();


  // let newNotes = (notes)
  let newNotes = JSON.parse(JSON.stringify(notes))
      console.log(newNotes)
  //Logic to edit in client
  for(let index = 0; index < newNotes.length; index++){
    const element = newNotes[index];
    if(element._id === id){
      newNotes[index].title = title;
      newNotes[index].description =description ;
      newNotes[index].tag = tag;
    }
    break;
  }
  setNotes(newNotes)
  showAlert("Successfully updated note", "success")
}
// delete a note
const deleteNote =async (id) =>{
// API Call
const response = await fetch(`${BASE_URL}/api/notes/deletenote/${id}`,{
  method: 'DELETE',
  headers:{
    'Content-Type': "application/json",
    "auth-token": localStorage.getItem("token")
  },

})
const json= response.json();
// console.log(json)


const newNotes = notes.filter((note)=>{
    return note._id !== id
  })
  setNotes(newNotes)
  showAlert("Successfully deleted note", "success")
}
    return(
        <NoteContext.Provider value={{notes, setNotes, addNote, deleteNote, getNotes, editNote, showAlert, alert, setAlert}}>
            {props.children}
        </NoteContext.Provider>
    )
}
// }
export default NoteState;