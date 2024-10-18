const express = require('express');
const router = express.Router();
// const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth')
const User = require('../../models/User');
const HoldingTitle = require('../../models/HoldingTitle')
const Titles = require('../../models/Titles')


router.get('/', auth, async (req, res) => {
  try {
    if(!req.query.title_id){
      req.json('title id does not exists')
    }
    const holdingtitles = await HoldingTitle.find({
      title_id: req.query.title_id.toString()
      // user: req.user.id
    })
    res.json(holdingtitles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.put('/:id', auth, async(req, res) =>{
  console.log(req.params.id)
  console.log(req.body.newStatus)
  try {
    const myquery = { _id: req.params.id };
    const newvalues = { $set: { status: req.body.newStatus } };
    const updatedRowData = await HoldingTitle.findByIdAndUpdate(
      myquery, newvalues
    );

    const completed_details = await HoldingTitle.countDocuments({status: '1', title_id: req.body.title_id.title_id});
    const total_details = await HoldingTitle.countDocuments({title_id: req.body.title_id.title_id});

    console.log(completed_details);
    console.log(total_details);
    if(completed_details === total_details){
      const query = { _id: req.body.title_id.title_id };
      const value = { $set: { 'data.state': 'Completed' } };
      const updateTitles = await Titles.findByIdAndUpdate(
        query, value
      );
    }
    else{
      const query = { _id: req.body.title_id.title_id };
      const value = { $set: { 'data.state': completed_details+'/'+total_details } };
      const updateTitles = await Titles.findByIdAndUpdate(
        query, value
      );
    }

    res.json(updatedRowData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating row');
  }
});


router.post('/mint',auth, async (req, res) => {
  try {
    const holdingtitles = new HoldingTitle({
      data: req.body,
      created_at: new Date()
    });
    await holdingtitles.save();
    return res.json('success');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


router.get('/test', async (req, res) => {
  const holdingtitleData = [
    {
      hold:'Car has a Lien to be Paid',
      //holden status 0: pending, 1: completed
      status: '0',
      responsible_image: '/sacramento.png',
      responsible_description: 'Sacramento',
      days: '31',
      notes: '',
      title_id: req.query.title_id,
    },
    {
      hold:'Car had a Registered Owner',
      status: '1',
      responsible_image: '/user1.png',
      responsible_description: 'Earl Garris',
      days: '8',
      notes: '',
      title_id: req.query.title_id,
    },
    {
      hold:'Car has a Title at Purchase',
      status: '1',
      responsible_image: '/user2.png',
      responsible_description: 'Melina B.',
      days: '5',
      notes: '',
      title_id: req.query.title_id,
    },
    {
      hold:'Documents are Signed and In-State',
      status: '1',
      responsible_image: '/DMV.png',
      responsible_description: 'DMV',
      days: '22',
      notes: '',
      title_id: req.query.title_id,
    },
    {
      hold:'Correct Documents Signed by the Dealer.',
      status: '1',
      responsible_image: '/sacramento_blue.png',
      responsible_description: 'Sacramento',
      days: '12',
      notes: '',
      title_id: req.query.title_id,
    },
    {
      hold:'Bank sent the correct Title',
      status: '1',
      responsible_image: '/capitalone.png',
      responsible_description: 'Capitalone',
      days: '22',
      notes: '',
      title_id: req.query.title_id,
    },
    {
      hold:'Car has a Lien to be Paid',
      status: '0',
      responsible_image: '/sacramento.png',
      responsible_description: 'Sacramento',
      days: '31',
      notes: '',
      title_id: req.query.title_id,
    },
  ];
  holdingtitleData.map( async holdingtitleRecord => {
    holdingtitles = new HoldingTitle({
      hold: holdingtitleRecord.hold,
      status: holdingtitleRecord.status,
      responsible_image: holdingtitleRecord.responsible_image,
      responsible_description: holdingtitleRecord.responsible_description,
      days: holdingtitleRecord.days,
      notes: holdingtitleRecord.notes,
      title_id: holdingtitleRecord.title_id,
    });
    await holdingtitles.save();
  });
  return res.json(holdingtitleData)
});

module.exports = router;