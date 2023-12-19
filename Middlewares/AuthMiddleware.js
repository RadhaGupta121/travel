require('dotenv').config();
const jwt=require('jsonwebtoken');
const { User } = require('../Models/Schema/userSchema.model');

module.exports.userVerification=async(req,res,next)=>{
const token=req.cookies.token;
if(!token)
{
 return res.json({status:false})
}
else{
    try {
       jwt.verify(token,process.env.Key,async(err,data)=>{
          if(err)
          {
            res.json({status:false,message:"There is some error in token"})
          }
          else{
            const user= await User.findById(data.id);
            console.log(user);
            if(user)
            {
                return res.json({status:true,userInfo:user})
            }
            else return res.json({status:false,message:"There is no user by this data.id in User schema"})
          }
       }) 
    } catch (error) {
        
    }
}
}