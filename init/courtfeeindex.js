const courtFee=require('../models/courtfee');
const initData=require('./courtfeedata');
const mongoose=require('mongoose');

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

const initDB=async()=>{
    await courtFee.deleteMany({});
    await courtFee.insertMany(initData.Feedata);
    console.log("data is inserted");
}

initDB();