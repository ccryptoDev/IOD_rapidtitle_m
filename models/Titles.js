const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TitlesSchema = new Schema({
  titleId: {
    type: Number,
    required: true
  },
  metadataURI: {
    type: String,
    required: true
  },
  data : {
    type : Object,
    required : true
  },
  numHolds: {
    type: Number,
    requried: true
  },
  completedHolds: {
    type: Number,
    required: true
  },
  status: {
    type: Number,
    required: true
  },
  created_at: {
    type : Date,
    required: true
  }
});

module.exports = Titles = mongoose.model("titles", TitlesSchema);
