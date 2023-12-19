const {User}=require('../Models/Schema/userSchema.model.js');
const bcrypt=require('bcrypt');
const {createSecreteToken}=require('../Utills/SecreteToken.js')//createSecreteToken
module.exports.Login=async(req,res,next)=>{
    try {
       const data ={
      
           password:req.body.password,
           email:req.body.email,
          }
         const output=await User.findOne({email:data.email});
       console.log("this is output after login:",output);
        if(output)
        {
           const checkPassword=await bcrypt.compare(data.password,output.password);
          
           if(checkPassword)
           {
            let token=createSecreteToken(output._id);
            res.cookie('token',token,{httpOnly:true,withCredentials:true,maxAge:3600000});
               res.status(200).json({sucess:'true',message:"User logedin successfully",userInfo:output});
              
               next();
           }
           
       else
       {
           res.status(400).json({sucess:"false",message:"Incorrect password"})
       }
       
        }
        else{
           res.status(400).json({sucess:"false",message:"User not found"});
        }
    } catch (error) {
       res.send(error)
    }
   }

module.exports.Register=async(req,res,next)=>{
    try {
     const user={
         name:req.body.name,
         password:req.body.password,
         email:req.body.email,
         phoneNumber:req.body.phoneNumber,
         address:{
             city:req.body.city,
             state:req.body.state
         }
     }
    const isExist= await User.findOne({email:user.email});
    console.log("this is is Exist info",isExist);
    if(isExist)
    {
      return  res.json({message:"User already exist by this emailid"})
    }
  
  const userCreated=await  User.create(user);
 console.log('this is new user created',userCreated);
 console.log('this is userId',userCreated._id);
    const token=await createSecreteToken(userCreated._id);
   
    res.cookie('token',token,{
        withCredentials:true,
        httpOnly:false
    });
  
  
    res.status(201).json({message:"User created successfully",success:true,userInfo:userCreated});
    next ();
    } catch (error) {
     res.send({message:error})
    }
 }