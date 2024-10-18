const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const MessageSchema = new Schema({
  sender : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  roomId: {
    type: String,
    required: true,
  },
  roomName: {
    type: String,
    required: true,
  },
  content: {
    type : String,
    required: false,
  },
  filePath: {
    type : Object,
    required: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
    required: true,
  }
});

module.exports = Message = mongoose.model("messages", MessageSchema);
