const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  avatar : {
    type : String,
    required : true
  },
  title: {
    type: String,
    required: true
  },
  bio: {
    type: String,
  },
  links: [
    // {
    {
      type: String,
      required: true
    }
  //   title: {
  //     type  : String,
  //     required : true
  //   },
  //   image_link : {
  //     type : String,
  //     required : true
  //   }
  // }
  ],
  membership: {
    type: String,
    default: 'free',
  },
  kp: {
    type: String,
    default: 200
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
