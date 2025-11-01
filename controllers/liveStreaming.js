const streams=require('../models/liveStreaming')

module.exports.index=async(req,res)=>{

    const allstream=await streams.find({});
    // console.log(allstream)
    res.render("streams/index",{streams:allstream})
};

module.exports.newStreamfrom=(req,res)=>{
    res.render("streams/new");
};

module.exports.saveStreamToDb=async(req,res)=>{
    const newstream=new streams(req.body);
    let savestream=await newstream.save();
    // console.log(savestream);
    res.redirect("/streams");
};