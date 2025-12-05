const laws=require("../models/law");

module.exports.index=async (req, res) => {
  try{
      const allLaws = await laws.find({});
      res.render("laws/index", { laws: allLaws });
  }catch(err){
      req.flash("error","Some Server Error Occure Please Try Again");
      res.redirect("/");
  }

};

//new law
module.exports.newLawForm=(req,res)=>{
    res.render("laws/new.ejs");
};

module.exports.saveLawToDB=async (req, res) => {
  try {
    const { title, act_number, category, sections } = req.body;

    // Convert penalties & keywords from comma-separated strings to arrays
    const formattedSections = sections.map(sec => ({
      section_number: sec.section_number,
      section_title: sec.section_title,
      description: sec.description,
      penalties: sec.penalties ? sec.penalties.split(',').map(p => p.trim()) : [],
      keywords: sec.keywords ? sec.keywords.split(',').map(k => k.trim()) : []
    }));

    const newLaw = new laws({
      title,
      act_number,
      category,
      sections: formattedSections,
      last_updated: new Date()
    });

    await newLaw.save();
    req.flash("success","New Law Saved");
    res.redirect("/laws");
  } catch (err) {
    console.error(err);
    req.flash("error","New Law Not Saved Try Again");
    res.redirect("/laws/new");
  }
}

//show route
module.exports.lawDetail=async(req,res)=>{
  try{
    const {id}=req.params;
    const law=await laws.findById(id);
    res.render("laws/show.ejs",{law});
  }catch(err){
    req.flash("error","Can Not Find The Law");
    res.redirect("/laws");
  }
    
};

//delete
module.exports.deleteLaw=async(req,res)=>{
  try{
    const {id}=req.params;
    await laws.findByIdAndDelete(id);
    res.redirect("/laws");
  }catch(err){
    req.flash("error","Error To Delete A Law");
    res.redirect("/laws");
  }
    
};