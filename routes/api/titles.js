const express = require('express');
const router = express.Router();
// const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth')
const User = require('../../models/User');
const Titles = require('../../models/Titles');
const { findByIdAndDelete, findByIdAndUpdate } = require('../../models/User');


router.get('/', auth, async (req, res) => {
  try {
    const titles = await Titles.find({
      // user: req.user.id
    })
    res.json(titles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
  
});

router.get('/filter', auth, async (req, res) => {
  try {
    const titles = await Titles.find({
      status: Number(req.query.status)
    });

    res.status(200).json(titles);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(JSON.stringify(err));
  }
});

router.get('/search', auth, async (req, res) => {
  console.log(req.query.search_title);
  try {
    const titles = await Titles.find({
      "data.make":{$regex: new RegExp(req.query.search_title.toString(), 'i')}
    })
    console.log(titles);
    res.json(titles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
  
});

router.post('/mint', auth, async (req, res) => {

  try {
    const titles = new Titles({
      titleId: req.body.titleId,
      metadataURI: req.body.metadataURI,
      data: req.body.metadata,
      numHolds: req.body.numHolds,
      completedHolds: req.body.completedHolds,
      status: req.body.status,
      created_at: new Date()
    });

    await titles.save();
    return res.json('success');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
  
});

router.put('/:title_id', auth, async(req, res) => {
  try {
    const query = {titleId: req.params.title_id};
    const updateValues = { $set: {
      numHolds: req.body.updatedTitle.numHolds,
      completedHolds: req.body.updatedTitle.completedHolds,
      status: req.body.updatedTitle.status
    }};

    const updatedTitle = await Titles.findOneAndUpdate(
      query, updateValues, {new: true}
    );
    res.status(200).send(JSON.stringify(updatedTitle));
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

router.get('/test', async (req, res) => {
  const titleData = [
    {
      image:'1.jpg',
      sn: 'KM8J3CA46KU909995',
      title: 'Hyundai Tucson',
      price: '30400',
      floorPlan: '3040',
      duration: '31',
      number: 'K9015A',
      holds: '8/10',
      status: 'Pending',
      observer: 'user1.png',
      observer_name:'James C',
    },
    {
      image:'2.jpg',
      sn: 'WA1LFAFP7DA041046',
      title: 'Audi Q520T',
      price: '90690',
      floorPlan: '969',
      duration: '28',
      number: 'K9204A',
      holds: '8/10',
      status: 'Pending',
      observer: 'user3.png',
      observer_name:'Oman C',
    },
    {
      image:'3.jpg',
      sn: 'WA1LFAFP7DA041046',
      title: 'Audi Q520T',
      price: '90690',
      floorPlan: '9069',
      duration: '28',
      number: 'K9204A',
      holds: '8/10',
      status: 'Pending',
      observer: 'user3.png',
      observer_name:'James G',
    },
    {
      image:'4.jpg',
      sn: 'WDDGJ4HB9DG054666',
      title: 'Mercedes Benz C250C',
      price: '50400',
      floorPlan: '9069',
      duration: '27',
      number: 'K9076A',
      holds: '7/10',
      status: 'Pending',
      observer: 'user2.png',
      observer_name:'James C',
    },
    {
      image:'4.jpg',
      sn: 'KM8J3CA46KU909995',
      title: 'Hyundai Tucson',
      price: '30400',
      floorPlan: '9069',
      duration: '31',
      number: 'K9015A',
      holds: '8/10',
      status: 'Pending',
      observer: 'user1.png',
      observer_name:'Tomas C',
    },
    {
      image:'3.jpg',
      sn: 'WA1LFAFP7DA041046',
      title: 'Audi Q520T',
      price: '90690',
      floorPlan: '9250',
      duration: '28',
      number: 'K9204A',
      holds: '8/10',
      status: 'Pending',
      observer: 'user3.png',
      observer_name:'James C',
    },
    {
      image:'2.jpg',
      sn: 'WA1LFAFP7DA041046',
      title: 'Audi Q520T',
      price: '90690',
      floorPlan: '9053',
      duration: '28',
      number: 'K9204A',
      holds: '8/10',
      status: 'Pending',
      observer: 'user3.png',
      observer_name:'chris C',
    },
    {
      image:'1.jpg',
      sn: 'WDDGJ4HB9DG054666',
      title: 'Mercedes Benz C250C',
      price: '50400',
      floorPlan: '5069',
      duration: '27',
      number: 'K9076A',
      holds: '7/10',
      status: 'Pending',
      observer: 'user2.png',
      observer_name:'James C',
    },
  ];
  titleData.map( async titleRecord => {
    title = new Titles({
      image: titleRecord.image,
      sn: titleRecord.sn,
      title: titleRecord.title,
      price: titleRecord.price,
      floorPlan: titleRecord.floorPlan,
      duration: titleRecord.duration,
      number: titleRecord.number,
      holds: titleRecord.holds,
      status: titleRecord.status,
      observer: titleRecord.observer,
      observer_name: titleRecord.observer_name,
    });
    await title.save();
  });
  return res.json('success')
});

module.exports = router;