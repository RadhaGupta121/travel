const express=require('express');
const DB_connection =require('./db/DB_connection.js');
const app=express();
const tripinfo=require('./Routes/user.js');
const authroute=require('./Routes/AuthRoute.js')
const cors=require('cors');
require('dotenv').config();
var bodyParser=require('body-parser');
const cookieParser = require('cookie-parser');
app.use(bodyParser.json());
app.use(cors({
    origin:"https://new-travel-frontend.vercel.app",
    credentials:true,
    methods: ["GET", "POST", "PUT", "DELETE"],
 } ))
 app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieParser());
DB_connection()
.then((res)=>{
    app.get('/',(req,res)=>{
        res.send("this is listening")
    })
   
    app.use('/',authroute)
    app.use('/trip',tripinfo);
    app.listen(process.env.PORT||5000,(req,res)=>{
        console.log('listening')
     })
    console.log(res.message);
})

