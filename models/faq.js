const mongoose=require("mongoose");
const schema=mongoose.Schema;

const faqSchema= new schema({
    question : {
        type : String,
        required : true,
        unique : true,
        trim :true
    },
    answer : {
        type :String,
        required : true,
        trim : true
    },
    category :{
        type :String,
        required : true,
        trim : true
    },
    created_at: {
    type: Date,
    default: Date.now
  }
})

const faq=mongoose.model('faq',faqSchema);

module.exports=faq;