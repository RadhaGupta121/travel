require('dotenv').config();
const jwt=require('jsonwebtoken');
// console.log(process.env.Key)
module.exports.createSecreteToken=(id)=>{
    const token=jwt.sign({id},process.env.Key,{expiresIn:3*24*60*60});
   
    return token;
}