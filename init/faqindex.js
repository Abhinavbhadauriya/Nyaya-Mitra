const mongoose=require('mongoose');
const initfaqData=require('./faqdata');
const faqs=require('../models/faq');

const mongourl="mongodb://127.0.0.1:27017/nayamitra";

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
    await faqs.deleteMany({});
    await faqs.insertMany(initfaqData.faqData);
    console.log("data is inserted");
}

initData();