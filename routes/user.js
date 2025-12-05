const express=require("express");
const router=express.Router();
const user=require('../models/user');
const passport=require('passport')
const { isLogin } = require("../middleware");

router.get("/",(req,res)=>{
    res.render("user/verify")
});

router.get("/signup",(req,res)=>{
    let {code}=req.query;
    console.log(code);
    if(code==process.env.CODE){
        res.render("user/newuser");
    }else{
        res.send("Invalid code");
    }
    
})

//save user
router.post('/register', async (req, res) => {
    console.log(req.body)
  try {
    const { username, email, number, password } = req.body;
    
    const newUser = new user({ username, email, number });

    await user.register(newUser, password);
    res.redirect("/");
    console.log(newUser);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
});

router.get("/login",(req,res)=>{
    res.render("user/loginuser");
})

router.post("/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/user/login",
  }),
  (req, res) => {
    
    req.flash("success","Welcome")
    res.redirect("/"); 
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