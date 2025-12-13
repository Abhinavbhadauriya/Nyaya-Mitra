const mongoose=require('mongoose');
const initfaqData=require('./faqdata');
const faqs=require('../models/faq');


const mongourl=process.env.MONGOURL;

async function main() {
    await mongoose.connect(mongourl)
    
}

main().then(()=>{
    console.log("connceted to db");
})
.catch(e=>{
    console.log("error to conncet Db");
    console.log(e);
})


//insert data
const initData=async()=>{
    
    await faqs.insertMany(initfaqData.faqData);
    console.log("data is inserted");
}

initData();