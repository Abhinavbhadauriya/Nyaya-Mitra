const Traffic=require('../models/taffic');

module.exports.traficInfoForm=(req, res) => {
  res.render("traffic/index");
};

module.exports.trafficDetails= async (req, res) => {
  const { vehicleNumber, mobileNumber } = req.query;
 
  const trafficdetails = await Traffic.find({
    vehicleNumber: vehicleNumber,
    mobileNumber
  });

  res.render("traffic/detail", { trafficdetails });
};

module.exports.newTrafficVoilationForm=(req,res)=>{
  res.render("traffic/new");
};

module.exports.saveTrafficVoilationInDb=async(req,res)=>{
  const newtrafficVoilation=new Traffic(req.body);
 
  await newtrafficVoilation.save();
  console.log(newtrafficVoilation)
  res.redirect("/traffic");
};

module.exports.deleteTrafficVoilationDetail=async (req, res) => {
  try {
    const { id } = req.params;
    await Traffic.findByIdAndDelete(id);
    res.redirect("/traffic/detail");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting traffic record");
  }
};