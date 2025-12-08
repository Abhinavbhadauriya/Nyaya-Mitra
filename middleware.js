module.exports.isLogin = (req, res, next) => {
  if (!req.user && !req.member) {
    req.session.redirectUrl = req.originalUrl;

    if (req.originalUrl.startsWith("/member")) {
      return res.redirect("/member/login");
    }

    return res.redirect("/user/login");
  }
  next();
};


module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}

module.exports.isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "Admin") {
    req.flash("error", "Admin access only");
    return res.redirect("/user/login");
  }
  next();
};
