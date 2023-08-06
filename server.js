require("dotenv").config()
const express = require('express')
const mongoose = require('mongoose')
const routes = require('./Routes/EmpRoutes')
const app = express()

app.use(express.json())
app.use('/api/employee',routes)

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Connected to DB")
    const port = process.env.PORT || 5000;
    app.listen(port,(err)=>{
        if(err) throw err;
        console.log(`server is running on port ${port}`) 
    })

}).catch((err)=>{
    console.log(err)
})