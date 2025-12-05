const express=require('express')
const courtFee=require('../models/courtfee');
const router=express.Router();

router.get('/',(req,res)=>{
    res.render("courtfee/index");
})

router.get('/detail', async (req, res) => {

  let { caseId, partyName, otp } = req.query;

  if (!otp || otp != req.session.otp) {
    req.flash("error", "Please enter correct OTP");
    return res.redirect("/courtfee");   
  }

  const finedata = await courtFee.findOne({ caseId, partyName });


  console.log(finedata);
  return res.render("courtfee/detail", { finedata }); 
});

module.exports=router;
