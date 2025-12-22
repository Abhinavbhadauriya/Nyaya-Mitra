const express=require("express");
const passport=require('passport');
const router=express.Router();
const member=require('../models/member');
const {isAdmin, isLogin, saveRedirectUrl } = require("../middleware");
const memberController=require('../controllers/member')
router.get("/singup",isAdmin,isLogin,(req,res)=>{
    res.render('member/new')
})

router.post('/register',isAdmin,isLogin,memberController.saveMember);


router.get("/login",(req,res)=>{
    res.render("member/loginmember");
})

router.post("/login",
  saveRedirectUrl,
  passport.authenticate("memberLocal", {
    failureFlash: true,
    failureRedirect: "/member/login",
  }),
  (req, res) => {
    req.flash("success", "Welcome Member")
    let redirectUrl = res.locals.redirectUrl || "/laws";
    res.redirect(redirectUrl); 
  }
);

router.get("/allmembers",isAdmin,isLogin,memberController.allMembers)

router.delete("/remove/:id",isAdmin,isLogin,memberController.deleteMember)
module.exports=router;

