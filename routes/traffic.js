const express = require("express");
const Traffic = require("../models/taffic");
// const Otp = require("../models/otp");
// const axios = require("axios");

const router = express.Router();
const trafficController=require('../controllers/traffic');
const { isLogin } = require("../middleware");



// Home page
router.get("/", trafficController.traficInfoForm);

//all Fine
router.get("/allRecords",isLogin,trafficController.allrecords);

// Detail page
router.get("/detail",trafficController.trafficDetails);

//add new 
router.get('/new',isLogin,trafficController.newTrafficVoilationForm);

router.post('/',isLogin,trafficController.saveTrafficVoilationInDb)

//delete
router.delete('/:id',isLogin,trafficController.deleteTrafficVoilationDetail);

module.exports = router;

