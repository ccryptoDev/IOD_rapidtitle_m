const express = require('express');
const router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
// @route    POST api/collection/createCollection
// @desc     Create Collection
// @access   Public
router.post('/', async (req, res) => {

  try {
    // To Do
    const form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
      res.send(files.avatar.filepath);
      // const oldpath = files.avatar.filepath;
      // const fileName = fields.nation + fields.number + path.extname(files.fileupload.originalFilename);

      // const newpath = './../demo/public/images/file/' + fileName.replace(' ', '');
      // const readStream = fs.createReadStream(oldpath);
      // const writeStream = fs.createWriteStream(newpath);
      // readStream.pipe(writeStream);
      // readStream.on('end', function () {
      //   fs.unlinkSync(oldpath);
      //   res.send("success");
      // });
    });

  }

  catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


module.exports = router;
