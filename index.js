const express=require('express')
const dotenv = require('dotenv').config()
const mongoose= require('mongoose')
const router = require("./router/route")
const cookie = require("cookie-parser")
const path=require('path')
const app = express();


//for setting view engine
app.set("view engine","ejs")

app.use(express.static(path.join(__dirname,"public")))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(router)
app.use(cookie())


//mongo db connecgion
mongoose.connect('mongodb://localhost:27017/blog').then(() => console.log('Db connected'));

//for server
const port = 5000;
app.listen(port ,() => 
{
    console.log('Application is listneing on PORT' ,port);
})


