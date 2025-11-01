const mongoose=require("mongoose");
const schema=mongoose.Schema;

const liveStreamSchema= new schema({
    courtName: {
    type: String,
    required: true,
    trim: true
  },
  youtubeLink: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  isLive: {
    type: Boolean,
    default: true  
  },
  startedAt: {
    type: Date,
    default: Date.now
  }
})
const liveStream=mongoose.model('liveStream',liveStreamSchema);

module.exports=liveStream;

