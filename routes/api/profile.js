const express = require('express');
const router = express.Router();
// const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth')
const User = require('../../models/User');
const Profile = require('../../models/Profile.js')
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
// Image upload section
// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    })
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/getProfileByParams/:username', auth, async (req, res) => {
  try {
    const user = await User.findOne({
      username : req.params.username
    })
    const {_id} = user;
    const profile = await Profile.findOne({
      user: _id
    })
    if(profile == null){
      return res.status(400).json({errors : [{msg : 'There is no profile for this user'}]});
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
// you should check that in ifcase
//like this
const isInArray=(arr, item)=>{
  if(arr.length == 0 || arr == null) return false;
  else {
    for(item_ of arr) {
      if(item.toUpperCase() == item_.toUpperCase()) return true;
    }
    return false;
  }
}
//ADD Links to profile
//@Post call
router.post(
  '/add_link',auth,   
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
   
  try{
    const {
      link
    } = req.body;
    let profile = await Profile.findOne({user: req.user.id});
    if(profile.links == null){ 
      profile.links = [link];
      profile.kp -= 10;
    }else if(!isInArray(profile.links, link))
     {
      profile.links.push(link);
      profile.kp -= 10;
     }else{
        return res.status(400).json({errors : [{msg : 'Link is duplicated'}]});
     }
     await profile.save();
    res.json(profile);
    
  }catch(err){
    return res.status(400).json({errors : [{msg : 'Link is required'}]});
  }
})

router.post(
    '/',
    // auth,
    // check('avatar', 'avatar is required').notEmpty(),
    // check('title', 'title is required').notEmpty(),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      try {      
        const form = new formidable.IncomingForm();                        
        form.parse(req, async function (err, fields, files) {
          let profile_ =await Profile.findOne({ user : fields.id});
          if(profile_ ==  null) {
            var kp = 150; 
          }
          const oldpath = files.avatar.filepath;
          const fileName = "upload_image" + Date.now() + path.extname(files.avatar.originalFilename);
          const {id} = fields;
          const newpath = './../client/public/img/upload/' + fileName.replace(' ', '');
          const readStream = fs.createReadStream(oldpath);
          const writeStream = fs.createWriteStream(newpath);
          readStream.pipe(writeStream);
          readStream.on('end', function () {
            fs.unlinkSync(oldpath);
            // res.send("success");
          });
          profileFields = {
            title : fields.title,
            bio : fields.bio,
            avatar : fileName,
            kp : kp
          }
          let profile = await Profile.findOneAndUpdate(
            { user : id },
            { $set: profileFields },
            { new: true, upsert: true, setDefaultsOnInsert: true }
          );
          return res.json(profile);
        });
        
      } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
      }
    }
  );

// @route    DELETE api/v2/profile/delete_link
// @desc     DELETE link
// @access   Private

router.delete('/delete_link/:index', auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });
    var { links } = foundProfile;  
    for(let i = 0; i < links.length; i++){
      if(i == req.params.index){
        links.splice(i ,1)
      }
    }
    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;