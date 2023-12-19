const mongoose=require('mongoose');
const tripSchema=new mongoose.Schema({
    userId:{type:String,required:true},
    source:{type:String,required:true},
    destinationArr:{type:Array,required:true},
    startDate:{type:Date,default:Date.now()},
    endDate:{type:Date,required:true},
    activityArr:{type:Array,required:true}
})

module.exports.trip=mongoose.model('trip',tripSchema);
