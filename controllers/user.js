const user=require('../models/user')

module.exports.saveUser=async (req, res) => {
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
}