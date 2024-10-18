const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  fname : {
    type : String,
    required : true
  },
  lname : {
    type : String,
    required : true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userType: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  wallet: {
    type: String,
    required: false
  }
});

module.exports = User = mongoose.model("user", UserSchema);
