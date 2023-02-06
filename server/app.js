require("dotenv").config();
const express = require("express");
const app = express();
const port =5000;
const mongoose = require("mongoose");
const users=require('./models/userSchema')
const cors=require('cors')
const router=require('./routes/router')
require('./db/conn')
app.use(cors());
app.use(express.json())
app.use(router);
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})