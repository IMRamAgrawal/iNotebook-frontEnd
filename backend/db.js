const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://imramagrawal:Ramtestprojectpass@cluster0.jmcxkw5.mongodb.net/notebook")
.then(()=> {console.log("connection successfull...")})
.catch((err)=> {console.log(err)});