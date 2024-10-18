const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');
const User = require('../../models/User');
const MAX = 673897;
const MIN = 134156;
const backlist = [
  'contact',
  'help',
  'order'
]

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min) // The maximum is exclusive and the minimum is inclusive
}

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  '/',
  check('fname', 'First name is required').notEmpty(),
  check('lname', 'Last name is required').notEmpty(),
  check('userType', 'Please select user type').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { fname, lname , email, password, userType } = req.body;
    try {
      let user_email = await User.findOne({ email });
      if (user_email) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      let user = await User.findOne({email});

        user = new User({
          email,
          fname,
          lname,
          password,
          userType,
        });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();
        const payload = {
          user: {
            id: user.id
          }
        };

        jwt.sign(
          payload,
          config.get('jwtSecret'),
          { expiresIn: '5 days' },
          (err, token) => {
            if (err) throw err;
            res.json({ token, succss : true, user});
          }
        );
      
      // }
      
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);



module.exports = router;
