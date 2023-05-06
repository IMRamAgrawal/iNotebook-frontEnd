const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://imramagrawal:Jaimongodb123@cluster0.r7lshib.mongodb.net/notebooks?retryWrites=true&w=majority")
.then(()=> {console.log("connection successfull...")})
.catch((err)=> {console.log(err)});