const faqs=require('../models/faq');

module.exports.index=async(req,res)=>{
    const allfaqs= await faqs.find({});
    // console.log(allfaqs);
    res.render('faqs/index',{faqs:allfaqs});

}

//Add New FAQ
module.exports.newfaqform=(req,res)=>{
    res.render('faqs/new');
}

//save into db
module.exports.saveToDb=async(req,res)=>{
    const newFaq=new faqs(req.body);
    // console.log(newFaq);
    await  newFaq.save();
    res.redirect("/faqs");
};

module.exports.DeleteFaq=async(req,res)=>{
    const {id}=req.params;
    const dfaq=await faqs.findByIdAndDelete(id);
    // console.log(dfaq);
    res.redirect("/faqs");
};
