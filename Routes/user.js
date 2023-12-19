const express=require('express');
const bcrypt=require('bcrypt');
const {User}=require('../Models/Schema/userSchema.model.js')
const router=express.Router();
const jwt=require('jsonwebtoken');
const { trip } = require('../Models/Schema/tripSchema.model.js');
const {userVerification}=require('../Middlewares/AuthMiddleware.js');
const { userConnection } = require('../Models/Schema/userConnection.model.js');
router.post('/newtrip/:id',async(req,res)=>{
  try {
     const data=req.body;
     const userId=req.params.id;
     console.log(data);
     const startDate=data.alldata[0].date;
     const endDate=data.alldata[0].enddate;
     const source=data.alldata[0].source[0];
     const destinationArr=data.alldata[1];
     const activityArr=data.alldata[2];
    //  const userId=data.alldata[3].data.userId;
     const allDataCollected={
        userId: userId,
        startDate:startDate,
        endDate:endDate,
        source:source,
        destinationArr:destinationArr,
        activityArr:activityArr
     }
     console.log("alldata collected",allDataCollected);
     const tripData= await trip.create(allDataCollected);
     console.log("Tripd data inserted in db",tripData);
     res.send(data);
  } catch (error) {
    console.log(error);
  }
})
router.get('/getalltrip/:id',async(req,res)=>{
try {
  const userId=req.params.id;
        console.log("This is listening",userId);
        const alltrip=await trip.find({userId:userId});
        console.log("alltrips: ",alltrip);
        res.send({alltrip:alltrip});
} catch (error) {
  console.log(error);
}
})
router.get('/getallconnection/:id',async(req,res)=>{
  try {
    const userId=req.params.id;
          console.log("This is listening",userId);
           const allconnection=await userConnection.find({userId:userId});
           console.log(allconnection)
         console.log(allconnection[0].connections);
       
         res.send({status:true,data:allconnection});
  } catch (error) {
    console.log(error);
  }
})
router.post('/addconnection/:id',async(req,res)=>{
  try {
    const userId=req.params.id;
    const item=req.body.item;
    const name=item.name.first+item.name.last;
    const city=item.location.city;
    const state=item.location.state;
    const country=item.location.country;
    const email=item.email;
    const picture=item.picture.medium;
    console.log("this is item from frontend in addconnection:",item);
          console.log("This is listening",userId);
          const newData = {
            userId: userId,
            connections: {
              name:name,
              city:city,
              state:state,
              email:email,
              country:country,
              picture:picture
            },
          };
          const updatedUserConnection = await userConnection.findOneAndUpdate(
            { userId: userId },
            { $push: { connections: newData.connections } },
            { new: true, upsert: true } // `new: true` returns the modified document, `upsert: true` creates a new document if it doesn't exist
          );
          console.log('User connection updated:', updatedUserConnection);
  
  } catch (error) {
    console.log(error);
  } 
})
module.exports=router;