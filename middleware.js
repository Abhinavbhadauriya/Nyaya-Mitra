module.exports.isLogin = (req, res, next) => {
    if (!req.isAuthenticated()) {  
        req.session.redirectUrl=req.originalUrl;
        return res.redirect('/user/login');
    }
    next(); 
};

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}