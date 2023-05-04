const express = require("express")
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes")
const { body, validationResult } = require('express-validator');


// Route 1: Get All the Notes using: GET "/api/notes/fetchallnotes". Login required
router.get("/fetchallnotes",fetchuser, async(req, res)=>{
    try{
    const notes = await Notes.find({user: req.user.id});

    res.json(notes)
    }catch(error){
        res.status(500).send("Internal server error")
    }
})
// Route 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post("/addnote", fetchuser,[
    body("title", "Enter a valid title").isLength({min:2}),
    body("description", "Description must be atleast 3 characters").isLength({min:3})
], async (req,res)=>{
    try{
    const{ title, description, tag } = req.body;
    // if there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const note = new Notes({
        title, description, tag , user: req.user.id
    })
    const savedNote = await note.save()
    res.json(savedNote)
}catch(error){
    res.status(500).send("Internal server error")
}
})

//ROUTE 3: Update an existing Note using: POST "/api/notes/updatenote". Login required
// router.put("/updatenote/id", fetchuser, async(req, res)=>{
router.put("/updatenote/:id", fetchuser, async(req, res)=>{
    const {title, description, tag} = req.body;
    // Create a newNote object
    try{
    const newNote ={};
    if(title){newNote.title = title};
    if(description){newNote.description = description}
    if(tag){newNote.tag = tag};

    //Find the  note to be updated and update it
 let note = await Notes.findById(req.params.id);
 if(!note){return res.status(401).send("Not Found")}

 if(note.user.toString() !== req.user.id){
  return res.status(401).send("Not Allowed");
 }

note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
res.json({note});
 } catch(error){
    res.status(500).send("Internal server error")
 }
})

// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete("/deletenote/:id", fetchuser, async(req, res)=>{
    const {title, description, tag} = req.body;
    //find the note to be deleted
    try{
let note = await Notes.findById(req.params.id);
if(!note){return res.status(404).send("Not Found")}

//Allow deletion only if user owns this Note
if(note.user.toString() !== req.user.id){
    return res.status(401).send("Not Allowed");
   }

note = await Notes.findByIdAndDelete(req.params.id)
res.json({"Success":"Note has been deleted", note: note})
} catch(error){
    res.status(500).send("Internal server error")
 }





})












module.exports = router