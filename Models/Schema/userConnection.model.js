const mongoose=require('mongoose');
const userConnectionSchema=new mongoose.Schema({
    userId:{type:String,required:true},
    connections:{type:Array,required:true,default:[]}
})

module.exports.userConnection=mongoose.model('userConnection',userConnectionSchema);
