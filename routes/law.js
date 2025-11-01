const express=require("express");
const router=express.Router();

const laws=require("../models/law");
const lawController=require('../controllers/laws');
const { isLogin } = require("../middleware");

//index
router.get("/", lawController.index);

//new law
router.get("/new",isLogin,lawController.newLawForm);

//add law into Db
router.post("/",lawController.saveLawToDB );


//show law
router.get("/:id",lawController.lawDetail);

//Delete Law
router.delete("/:id",isLogin,lawController.deleteLaw);



module.exports=router;