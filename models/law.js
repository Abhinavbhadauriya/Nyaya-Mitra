const mongoose=require("mongoose");
const schema=mongoose.Schema;

const sectionSchema = new schema({
  section_number: {
    type: String,
    required: true
  },
  section_title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  penalties: {
    type: [String], // Array of penalties
    default: []
  },
  keywords: {
    type: [String], // Array of keywords
    default: []
  }
});

const lawSchema = new schema({
  title: {
    type: String,
    required: true
  },
  act_number: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: true
  },
  sections: {
    type: [sectionSchema], // Embedded sections array
    default: []
  },
  last_updated: {
    type: Date,
    default: Date.now
  }
});

// law Model
const law = mongoose.model('Law', lawSchema);

module.exports = law;
