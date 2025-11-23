const mongoose = require("mongoose");
const schema=mongoose.Schema;
const traffic = new schema({
  vehicleNumber: {
    type: String,
    required: true,
    trim: true,
    uppercase: true, // ensures MP04AB1234 format
  },
  ownerName: {
    type: String,
    required: true,
    trim: true,
  },
  mobileNumber: { 
    type: String, 
    required: true, 
    trim: true, 
    match: [/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"], },
  violationType: {
    type: String,
    required: true,
    enum: [
      "Speeding",
      "Signal Jumping",
      "No Helmet",
      "Drunk Driving",
      "Overloading",
      "Wrong Parking",
      "No Seat Belt",
      "Using Mobile While Driving",
      "Expired License",
      "Other",
    ],
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  fineAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  dateOfViolation: {
    type: Date,
    default: Date.now
   
  },
  status: {
    type: String,
    enum: ["Pending", "Paid", "Contested"],
    default: "Pending",
  },
  paymentDate: {
    type: Date,
    default: Date.now
    
  },
  eChallanNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

const Traffic = mongoose.model("Traffic", traffic);

module.exports = Traffic;

