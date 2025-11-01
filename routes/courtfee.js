const express=require('express')
const courtFee=require('../models/courtfee');
const router=express.Router();

router.get('/',(req,res)=>{
    res.render("courtfee/index");
})

router.get('/detail',async(req,res)=>{
    
    let{caseId,partyName}=req.query;
    const finedata= await courtFee.findOne({caseId,partyName});
    if(!finedata){
        res.send("Invaild Details");
    }
    console.log(finedata);
    res.render("courtfee/detail",{finedata});
    
    
})

module.exports=router;
