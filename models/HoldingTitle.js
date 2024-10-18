const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const HoldingTitleSchema = new Schema({
  title_id : {
    type: String,
    required: false,
  },
  hold: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  responsible_image: {
    type : String,
    required: true,
  },
  responsible_description: {
    type : String,
    required: true,
  },
  days : {
    type: String,
    required: true,
  },
  notes : {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
    required: true,
  }
});

module.exports = HoldingTitle = mongoose.model("holdingtitles", HoldingTitleSchema);
