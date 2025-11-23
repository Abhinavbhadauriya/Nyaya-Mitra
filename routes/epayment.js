const express=require('express');
const router=express.Router();


router.get('/',(req,res)=>{
    res.render("epayment/index");
})



router.get("/pay",(req,res)=>{
    res.render("epayment/qr");
})

module.exports=router