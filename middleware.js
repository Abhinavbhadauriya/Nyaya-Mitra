module.exports.isLogin = (req, res, next) => {
    if (!req.isAuthenticated()) {  // ✅ fixed function name
        return res.redirect('/user/login');
    }
    next(); 
};
