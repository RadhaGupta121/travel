const express=require('express');
const cors=require('cors');

const app=express();

app.use(cors({
    Origin:process.env.CORS_ORGIN,
    credentials:true
 } ))
 app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"));
