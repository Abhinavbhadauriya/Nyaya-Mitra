const Traffic=require('../models/taffic');

module.exports.traficInfoForm=(req, res) => {
  res.render("traffic/index");
};

module.exports.trafficDetails = async (req, res) => {
  const { vehicleNumber, mobileNumber,otp } = req.query;
  try{
      if (!otp || otp != req.session.otp) {
    req.flash("error", "Please enter correct OTP");
   
    return res.redirect("/traffic");
    }

    const trafficdetails = await Traffic.find({
    vehicleNumber,
    mobileNumber
    });

    res.render("traffic/detail", { trafficdetails });
  }catch(err){
    console.error(err);
    req.flash("error","Error to find traffic record")
    res.redirect('/traffic');
  }
};

module.exports.newTrafficVoilationForm=(req,res)=>{
  res.render("traffic/new");
};

module.exports.saveTrafficVoilationInDb=async(req,res)=>{
  try{
    const newtrafficVoilation=new Traffic(req.body);
 
    await newtrafficVoilation.save();
    console.log(newtrafficVoilation)
    req.flash("success","Data Saved Successfully");
    res.redirect("/traffic");
  }catch(err){
    console.error(err);
    req.flash("error","E-Challan Number Already present")
    res.redirect('/traffic/new')
  }
};

module.exports.deleteTrafficVoilationDetail=async (req, res) => {
  try {
    const { id } = req.params;
    await Traffic.findByIdAndDelete(id);
    res.redirect("/traffic/detail");
  } catch (err) {
    console.error(err);
    req.flash("error","error to delete Traffic Voilation")
    res.redirect("/traffic/detail");
  }
};

//all Records
module.exports.allrecords=async(req,res)=>{
    try{
        const allrecords= await Traffic.find();
        console.log(allrecords);
        res.render("traffic/allrecords",{allrecords});
    }catch(err){
        req.flash("error","Can Not Find Records, Please Try Again");
        res.redirect("/Admin");
    }  
}