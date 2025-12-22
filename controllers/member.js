const member=require ("../models/member")
module.exports.saveMember=async (req, res) => {
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
}

module.exports.allMembers=async(req,res)=>{
  try{
     const allmembers=await member.find();
    res.render('member/allrecords',{allmembers})
  }catch(err){
    console.log(err);
    req.flash('error',"Something went wrong ,please try again");
    res.redirect('/');
  }
 
}

module.exports.deleteMember=async(req,res)=>{
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
}