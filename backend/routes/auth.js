const express = require("express")
const User = require("../models/User")
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser')
const JWT_SECRET = "Harryisagoodboy";

//create a user using : Post "/api/auth/". Doesn't require
router.post("/createuser",[
    body("name", "Enter a valid name").isLength({min: 3}),
    body("email", "Enter a valid email").isEmail(),
    body("password", "password can not be blank").exists(),
], async(req,res)=>{
    let success = false;
// if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success, errors: errors.array()})
        
    }
     
    const {email, password} = req.body;
    try{
    let user = await User.findOne({email: req.body.email})
    if(user){
        return res.status(400).json({success, error:"Sorry a user with this email already exists"})
    }
    // console.log(json.error)
const salt = await bcrypt.genSalt(10);
secpass =  await bcrypt.hash(req.body.password, salt);
//     console.log(req.body)
// const user = User(req.body);
// user.save()
user = await User.create({
    name: req.body.name,
    password: secpass,
    email: req.body.email,
  })

  const data = {
    user:{
        id: user.id
    }
  }

  const authtoken = jwt.sign(data, JWT_SECRET)
  console.log(authtoken)

//   res.json(user)
success = true;
res.json({success, authtoken})
}
catch(err){
    
    res.status(500).json("Some internal error occured")
}
//   .then(user => res.json(user))
//   .catch(err=>{console.log(err)
// res.json({error: "please enter a unique value", message: err.message})})
})

// Authenticate a User using: Post "/api/auth/login" . No login required
router.post("/login", [
    body("email", "Enter a valid email").isEmail(),
    body("password", "password can not be blank").exists(),
],async (req,res) => {
    let success = false;
// if there are errors, return bad request and the errors
const errors = validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
}

const {email, password} = req.body;
try{
let user = await User.findOne({email: req.body.email})
if(!user){
    success = false
    return res.status(400).json({error:"Please try to login with correct credentials"})
}
const passwordCompare = await bcrypt.compare(password , user.password);
if(!passwordCompare){
    success = false
    return res.status(400).json({error:"Please try to login with correct password"})
}
const data = {
    user:{
        id: user.id
    }
}

const authtoken = jwt.sign(data, JWT_SECRET);
success= true;
res.json({success, authtoken})


}catch(error){
    res.status(500).json("Some internal error occured")
}

})

// ROUTE 3: Get a loggedin user details using: post "/api/auth/getuser". Login required

// router.post("/getuser", fetchuser, async (req, res) => {
//     try{
//         userId = req.user.id;
//         const user = await User.findById(userId).select("-password")
//         res.send(user)
//     }catch(error){
//     res.status(500).send("Internal Server Error");
//     }
// })



module.exports = router