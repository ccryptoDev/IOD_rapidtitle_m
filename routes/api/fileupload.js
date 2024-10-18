const express = require('express');
const router = express.Router();
// const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth')
const User = require('../../models/User');
const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function(req, file, cb){
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    const second = now.getSeconds().toString().padStart(2, '0');
    const dateTimeString = `${year}${month}${day}_${hour}${minute}${second}`;
    const {name} = path.parse(file.originalname);
     cb(null,  name + '_' + dateTimeString + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000000},
}).single("myfile")

router.post('/',upload, async (req, res, next) => {
  return res.json(req.file);
  // upload(req, res, (err) => {
  //   console.log(req.files)
  //   const filepath = req.file.path;
  //   if (err) {
  //     console.log(err);
  //     res.sendStatus(500);
  //   } else {
  //     if (req.file === undefined) {
  //       console.log('Error: No File Selected!');
  //       res.sendStatus(400);
  //     } else {
  //       console.log(req.file.path);
  //       res.json(req.file.path);
  //     }
  //   }
  // });  
});


module.exports = router;