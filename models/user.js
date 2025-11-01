const mongoose=require('mongoose');
const schema=mongoose.Schema;

const passportLocalMongoose=require('passport-local-mongoose');

const userSchema=new schema(
    {
        email:{
            type:String,
            required:true
        },
        number:{
            type:Number,
            required:true
        }
    }
);

//plugin automatically add username and password and apply salting and hashing
userSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model('user',userSchema);