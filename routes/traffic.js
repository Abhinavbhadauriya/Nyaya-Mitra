const express = require("express");
const Traffic = require("../models/taffic");
// const Otp = require("../models/otp");
// const axios = require("axios");

const router = express.Router();
const trafficController=require('../controllers/traffic')

// Home page
router.get("/", trafficController.traficInfoForm);


// Detail page
router.get("/detail",trafficController.trafficDetails);

//add new 
router.get('/new',trafficController.newTrafficVoilationForm);

router.post('/',trafficController.saveTrafficVoilationInDb)

//delete
router.delete('/:id',trafficController.deleteTrafficVoilationDetail);

module.exports = router;


// // Send OTP
// router.post("/send-otp", async (req, res) => {
//   const { mobileNumber } = req.body;
//   if (!mobileNumber) return res.status(400).json({ message: "Mobile number required" });

//   try {
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     await Otp.create({ mobileNumber, otp });

//     // Send OTP via Fast2SMS
//     await axios.post("https://www.fast2sms.com/dev/bulkV2", {
//       route: "q",
//       message: `Your DOJ verification OTP is ${otp}. Expires in 5 min.`,
//       language: "english",
//       flash: 0,
//       numbers: mobileNumber
//     }, {
//       headers: { authorization: process.env.FAST2SMS_API_KEY }
//     });

//     res.status(200).json({ message: "OTP sent successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to send OTP", error: err.message });
//   }
// });

// // Verify OTP & Search
// router.post("/verify-and-search", async (req, res) => {
//   const { mobileNumber, vehicleNumber, otp } = req.body;
//   if (!mobileNumber || !vehicleNumber || !otp)
//     return res.status(400).json({ message: "All fields required" });

//   try {
//     const validOtp = await Otp.findOne({ mobileNumber, otp });
//     if (!validOtp) return res.status(400).json({ message: "Invalid or expired OTP" });

//     await Otp.deleteOne({ _id: validOtp._id });

//     const trafficdetails = await Traffic.find({
//       vehicleNumber: vehicleNumber.toUpperCase(),
//       mobileNumber
//     });

//     if (!trafficdetails.length) return res.status(404).json({ message: "No traffic record found" });

//     // Send data to frontend
//     res.status(200).json({ message: "OTP verified", data: trafficdetails });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: err.message });
//   }
// });
