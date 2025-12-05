const faqs=require('../models/faq');

module.exports.index=async(req,res)=>{
    try{
         const allfaqs= await faqs.find({});
    // console.log(allfaqs);
        res.render('faqs/index',{faqs:allfaqs});
    }catch(err){
        req.flash("error","cannot Show FAQS Now, Please Try Again");
        res.redirect("/");
    }
   

}

//Add New FAQ
module.exports.newfaqform=(req,res)=>{
    res.render('faqs/new');
}

//save into db
module.exports.saveToDb=async(req,res)=>{
    try{
         const newFaq=new faqs(req.body);
    // console.log(newFaq);
        await  newFaq.save();
        req.flash("success","FAQ Saved");
        res.redirect("/faqs");
    }
    catch(err){
        req.flash("error","FAQ Not Saved");
        res.redirect('/faqs/new');
    }
};

module.exports.DeleteFaq=async(req,res)=>{
    try{
        const {id}=req.params;
        const dfaq=await faqs.findByIdAndDelete(id);
        // console.log(dfaq);
        console.log(id);
        req.flash("success","FAQ Deleted SuccessFully");
        res.redirect("/faqs");
    }catch(err){
        req.flash("error","Cannot Delete FAQ");
        res.redirect("/faqs");
    }
    
};
