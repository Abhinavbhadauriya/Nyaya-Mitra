const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const passportLocalMongoose=require('passport-local-mongoose');


const memberSchema=new Schema(
    {
        name:{
            type:String,
            required:true
        },
         email:{
            type:String,
            required:true
        },
        number:{
            type:Number,
            required:true
        },
        role:{
            type : String,
            default :"Member"
        }

    }
)

memberSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model('member',memberSchema);