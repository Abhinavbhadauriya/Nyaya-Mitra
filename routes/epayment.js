const express=require('express');
const router=express.Router();


router.get('/',(req,res)=>{
    res.render("epayment/index");
})



router.get("/pay",(req,res)=>{
    res.send("Pay by UPI")
})

module.exports=router