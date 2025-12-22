const express=require('express')


const router=express.Router();
const { isLogin } = require("../middleware");
const courtFeeController=require("../controllers/courtfee")

router.get('/',(req,res)=>{
    res.render("courtfee/index");
})

router.get('/detail',courtFeeController.Detail );

router.get('/new',isLogin,(req,res)=>{
  res.render('courtfee/new');
})

router.post("/newsave",isLogin,courtFeeController.saveNewCase)

router.get("/allrecords",isLogin,courtFeeController.allCases)

module.exports=router;
