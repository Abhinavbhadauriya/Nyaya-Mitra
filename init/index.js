const mongoose=require("mongoose");
const initData=require("./lawdata");
const laws=require("../models/law");

const mongourl=process.env.MONGOURL;

async function main() {
    await mongoose.connect(mongourl);
}

main().then(()=>{
    console.log('connected to Db')
})
.catch(e=>{
    console.log("error to connect");
    console.log(e);
})

//add data into db
const initDb=async()=>{
    await laws.deleteMany({});
    await laws.insertMany(initData.lawData);
    console.log("data is inserted");
}

initDb();