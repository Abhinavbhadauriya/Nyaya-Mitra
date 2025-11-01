const mongoose=require('mongoose');
const streams=require('../models/liveStreaming');
const initData=require('./liveStreamingdata');

const mongourl="mongodb://127.0.0.1:27017/nayamitra";

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