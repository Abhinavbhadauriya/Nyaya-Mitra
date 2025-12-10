const express=require("express");
const passport=require('passport');
const router=express.Router();
const member=require('../models/member');
const {isAdmin, isLogin, saveRedirectUrl } = require("../middleware");
router.get("/singup",isAdmin,isLogin,(req,res)=>{
    res.render('member/new')
})

router.post('/register',isAdmin,isLogin,async (req, res) => {
    console.log(req.body)
  try {
    const {name, username, email, number, password } = req.body;
    
    const newmember = new member({name, username, email, number });
    

    const registerUser=await member.register(newmember, password);
    console.log(registerUser);
      req.flash("success","Member Registerd Successfully");
      res.redirect("/member/allmembers");
  } catch (err) {
    console.error(err);
   req.flash("error","Member already present");
   res.redirect("/member/singup");
  }
});


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

router.get("/allmembers",isAdmin,isLogin,async(req,res)=>{
  try{
     const allmembers=await member.find();
    res.render('member/allrecords',{allmembers})
  }catch(err){
    console.log(err);
    req.flash('error',"Something went wrong ,please try again");
    res.redirect('/');
  }
 
})

router.delete("/remove/:id",isAdmin,isLogin,async(req,res)=>{
  try{
    const {id}=req.params;
    const deletemember=await member.findByIdAndDelete(id);
    console.log(deletemember);
    req.flash("success","member was removed");
    res.redirect("/member/allmembers");
  }catch(err){
    console.log(err);
    req.flash("error","cannot Remove Member,Try Again !")
    res.redirect("/member/allmembers");
  }
})
module.exports=router;

