const mongoose=require('mongoose');
const streams=require('../models/liveStreaming');
const initData=require('./liveStreamingdata');

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

const initDb=async()=>{
    await streams.deleteMany({});
    await streams.insertMany(initData.streamData);
    console.log("data inserted");
}

initDb();