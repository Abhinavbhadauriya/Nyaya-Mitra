const streams=require('../models/liveStreaming')

module.exports.index=async(req,res)=>{
    try{
        const allstream=await streams.find({});
    res.render("streams/index",{streams:allstream})
    }catch(err){
        req.flash("error","Something Went Wrong Please Try Again");
        res.redirect("/streams");
    }

};

module.exports.newStreamfrom=(req,res)=>{
    res.render("streams/new");
};

module.exports.saveStreamToDb=async(req,res)=>{
    try{
         const newstream=new streams(req.body);
        let savestream=await newstream.save();
         req.flash("success","Live Stream Saved");
        // console.log(savestream);
        res.redirect("/streams");
    }catch(err){
        req.flash("error","Live Stream Not Save");
        res.redirect("/streams");
    }
   
};