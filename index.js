const express = require("express")
const app = express()
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const userRouter = require("./routers/userRouter");
const cookieParser = require("cookie-parser");


app.use(express.json())
app.use(cookieParser());

app.use("/api/v1/user",userRouter)

const PORT = process.env.PORT || 3000


app.listen(PORT, ()=>{
    console.log('====================================');
    console.log("server is running port ",PORT);
    console.log('====================================');
    connectDB()
})