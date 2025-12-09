const mongoose = require('mongoose');
const schema=mongoose.Schema;
const courtFeeSchema = new schema({
  caseId: { type: String, required: true, unique: true, trim: true },
  partyName: { type: String, required: true, trim: true },
  feeType: { type: String, required: true }, // e.g. "Filing Fee", "Certified Copy"
  amount: { type: Number, required: true },
  status: { type: String, enum: ['Pending','Paid'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
   mobileNumber: { 
    type: String, 
    required: true, 
    trim: true, 
    match: [/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"], 
    default:"9826500619"},
    
});

module.exports = mongoose.model('CourtFee', courtFeeSchema);
