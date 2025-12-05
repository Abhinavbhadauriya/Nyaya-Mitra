const express=require("express");
const router=express.Router();
const streams=require('../models/liveStreaming')
const streamController=require('../controllers/liveStreaming');
const { isLogin } = require("../middleware");

router.get("/",streamController.index);

//Add Live Streaming
router.get("/new",isLogin,streamController.newStreamfrom);

router.post("/",isLogin,streamController.saveStreamToDb);

module.exports = router;