const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://imramagrawal:jaimongodb123@cluster0.s07gac8.mongodb.net/inotebook?retryWrites=true&w=majority")
.then(()=> {console.log("connection successfull...")})
.catch((err)=> {console.log(err)});