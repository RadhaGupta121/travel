const mongoose=require('mongoose');

const bcrypt=require('bcrypt');
const UserSchema=new mongoose.Schema(
    {
name:{
    type:String,
    required:[true,'Username is required']
},
email:{
    type:String,
    required:[true,'Your email address is required'],
    lowercase:true,
    unique:[true,'Email already exist'],
},
password:{
    type:String,
    required:[true,"password is required"],
},

address:{
    city:{type:String,required:true},
    state:{type:String,required:true}
},
phoneNumber:{
    type:Number,
    
}
},
{
    timestamps:true
})
UserSchema.pre('save',async function(req,res){
 this.password=await bcrypt.hash(this.password,10);
})
module.exports.User=mongoose.model('User',UserSchema);
