const mongoose = require('mongoose');
const schema=mongoose.Schema;
const courtFeeSchema = new schema({
  caseId: { type: String, required: true, unique: true, trim: true },
  partyName: { type: String, required: true, trim: true },
  feeType: { type: String, required: true }, // e.g. "Filing Fee", "Certified Copy"
  amount: { type: Number, required: true },
  status: { type: String, enum: ['Pending','Paid'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CourtFee', courtFeeSchema);
