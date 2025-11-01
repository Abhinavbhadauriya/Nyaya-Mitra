const express=require("express");
const router=express.Router();
const streams=require('../models/liveStreaming')
const streamController=require('../controllers/liveStreaming')

router.get("/",streamController.index);

//Add Live Streaming
router.get("/new",streamController.newStreamfrom);

router.post("/",streamController.saveStreamToDb);

module.exports = router;