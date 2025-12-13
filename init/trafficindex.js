const initData=require('./traficdata');
const Traffic=require('../models/taffic');

const mongoose=require('mongoose');

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

const initDb=async(req,res)=>{
    await Traffic.deleteMany({});
    await Traffic.insertMany(initData.trafficData)
    console.log("Data Inserted");
}



initDb();