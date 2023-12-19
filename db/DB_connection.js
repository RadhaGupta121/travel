const mongoose=require('mongoose');
const {DB_name}=require('../constant.js');
require('dotenv').config();
const connectDB=async()=>{
    try{ 
        // `${process.env.DB_URL}/${DB_Name}`
        console.log("Dbname",DB_name);
       const connectionInstance=await mongoose.connect(`${process.env.DB_URL}/${DB_name}`)
        //  console.log(connectionInstance);  
         return {message:"Done"};
    }
catch(err)
{ 
    console.log("This is error",err,"error msg");
  
}
 } 
 module.exports=connectDB;