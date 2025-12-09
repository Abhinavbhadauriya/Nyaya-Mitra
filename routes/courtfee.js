const express=require('express')
const courtFee=require('../models/courtfee');
const { allrecords } = require('../controllers/traffic');
const router=express.Router();

router.get('/',(req,res)=>{
    res.render("courtfee/index");
})

router.get('/detail', async (req, res) => {

  let { caseId, partyName, otp, mobileNumber } = req.query;

  if (!otp || otp != req.session.otp) {
    req.flash("error", "Please enter correct OTP");
    return res.redirect("/courtfee");
  }

  const finedata = await courtFee.findOne({
    caseId: caseId.trim(),
    partyName: partyName.trim(),
    mobileNumber: mobileNumber.trim()
  });
  console.log(finedata);
  if (!finedata) {
    req.flash("error", "No record found");
    return res.redirect("/courtfee");
  }

  return res.render("courtfee/detail", { finedata });
});

router.get('/new',(req,res)=>{
  res.render('courtfee/new');
})

router.post("/newsave",async(req,res)=>{
  try{
  const newcase=new courtFee(req.body);
  await newcase.save();
  console.log(newcase);
  req.flash("success","New Case Saved");
  res.redirect("/courtfee/allrecords");
  }catch(err){
    console.log(err);
    req.flash('error','Case Not Save');
    res.redirect("/courtfee/new");
  }
})

router.get("/allrecords",async(req,res)=>{
  try{
    const allrecords=await courtFee.find();
    res.render("courtfee/allrecords",{allrecords})
  }catch(err){
    console.log(err);
    req.flash("error","Something went Wrong,Try Again !");
    res.redirect("/");
  }
})

module.exports=router;
