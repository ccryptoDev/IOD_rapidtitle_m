const express = require('express');
const router = express.Router();
// const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth')
const User = require('../../models/User');
const Message = require('../../models/Message')


router.get('/',auth, async (req, res) => {
  try {
    console.log(req.query,'fetching');
    if(!req.query.roomid){
      req.json('room id does not exists')
    }
    const messages = await Message.find({
      // user: req.user.id
      roomId: req.query.roomid.toString()
    }).populate("sender")

    const data = [];
    messages.map(row =>{
      member = {
        "filePath": row.filePath,
        "message": row.content,
        "fname": row.sender.fname,
        "__createdtime__": row.createdAt,
      }
      data.push(member);
    })
    console.log(data);
    res.json(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
  
});


module.exports = router;