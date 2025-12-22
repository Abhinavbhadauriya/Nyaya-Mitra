const express=require("express");
const router=express.Router();
const user=require('../models/user');
const passport=require('passport')
const { isLogin, saveRedirectUrl } = require("../middleware");
const userController=require('../controllers/user')

router.get("/",(req,res)=>{
    res.render("user/verify")
});

router.get("/signup", (req, res) => {
    let { code } = req.query;
    console.log(code);
    
    if (code === process.env.CODE) {
        res.render("user/newuser");
    } else {
        req.flash("error", "Please enter Valid Code");
        res.redirect("/user");
    }
});


//save user
router.post('/register',userController.saveUser );

router.get("/login",(req,res)=>{
    res.render("user/loginuser");
})

router.post("/login",
  saveRedirectUrl,
  passport.authenticate("userLocal", {
    failureFlash: true,
    failureRedirect: "/user/login",
  }),
  (req, res) => {    
    req.flash("success","Welcome")
    let redirectUrl=res.locals.redirectUrl||"/";
    res.redirect(redirectUrl); 
  }
);

router.get("/logout", isLogin, (req, res, next) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
            req.flash("error", "Something Went Wrong");
            return res.redirect("/"); 
        }

        req.flash("success", "Logged Out Successfully");
        res.redirect("/");              
    });
});




module.exports=router;