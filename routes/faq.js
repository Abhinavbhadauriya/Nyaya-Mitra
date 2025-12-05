const express=require('express');
const router=express.Router();

//require faq model
const faqs=require('../models/faq');
// const { router } = require('./law');
const faqcontroller=require('../controllers/faqs');
const { isLogin } = require('../middleware');

//main route
router.get('/',faqcontroller.index)

//Add FAQ
router.get("/new",isLogin,faqcontroller.newfaqform)
//Insert Into Db
router.post("/",isLogin,faqcontroller.saveToDb)

//Delete Faq
router.delete("/:id",isLogin,faqcontroller.DeleteFaq)


module.exports=router;