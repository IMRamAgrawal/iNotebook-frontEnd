import React, { useContext } from 'react'
import Notes from './Notes';
import noteContext from '../context/noteContext';



export const Home = () => {
const context = useContext(noteContext);
const {notes, setNotes} = context;


  return (
    <div>

       <Notes/>
    </div>
  )
}
export default Home;