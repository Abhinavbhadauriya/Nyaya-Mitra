const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  mobileNumber: {
    type: String,
    required: true,
    match: [/^[6-9]\d{9}$/, "Enter valid mobile number"]
  },
  otp: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300 // OTP expires in 5 minutes (300 sec)
  }
});

const Otp = mongoose.model("Otp", otpSchema);
module.exports = Otp;
