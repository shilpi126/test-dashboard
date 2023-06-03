const express = require("express")
const app = express()
const dotenv = require("dotenv").config();
const connectDB = require("./config/db")
app.use(express.json())



const PORT = process.env.PORT || 3000


app.listen(PORT, ()=>{
    console.log('====================================');
    console.log("server is running port ",PORT);
    console.log('====================================');
    connectDB()
})