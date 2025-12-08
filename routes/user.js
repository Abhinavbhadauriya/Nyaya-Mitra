const express=require("express");
const router=express.Router();
const user=require('../models/user');
const passport=require('passport')
const { isLogin, saveRedirectUrl } = require("../middleware");

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
router.post('/register', async (req, res) => {
    console.log(req.body)
  try {
    const {name, username, email, number, password } = req.body;
    
    const newUser = new user({name, username, email, number });
    

    const registerUser=await user.register(newUser, password);
    console.log(registerUser);
    req.logIn(registerUser,(err)=>{
      if(err){
       return res.redirect('/user');
      }
      req.flash("success","welcome");
      res.redirect("/");
    })
  } catch (err) {
    console.error(err);
   req.flash("error","user already present");
   res.redirect("/user");
  }
});

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