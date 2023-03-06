const { Career } = require('../models/career');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const fs = require("fs");
var glob = require("glob");
const cloudinary = require('cloudinary').v2;
require('../config/cloudinary_config');

const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

router.get('/get-all-resume', [auth, admin], async (req, res) => {
  const resumes = await Career.find().sort('-dateUploaded');
  res.send({ resumes: resumes });
});

router.post('/upload-resume', async (req, res) => {
  // console.log(req.body)
  let career = new Career({
    fName: req.body.fName,
    lName: req.body.lName,
    email: req.body.email,
    mobile: req.body.mobile,
    position: req.body.position,
    city: req.body.city,
    resume: req.body.resume,
    uploadedResumefileName: req.body.uploadedResumefileName,
    uploadedResumefileNamePublicId: req.body.uploadedResumefileNamePublicId,
  });
  career = await career.save();
  // const resumes = await Career.find().sort('-dateUploaded');
  res.send({ new: career });
});


router.delete('/delete/:id', [auth, admin], async (req, res) => {
  const career = await Career.findByIdAndRemove(req.params.id, { useFindAndModify: true });

  if (!career) return res.status(404).send('The resume with the given ID was not found.');
  const resumes = await Career.find().sort('-dateUploaded');
  try {
    cloudinary.uploader.destroy(career.uploadedResumefileNamePublicId, resource_type = 'image')
      .then(() => {
        return res.send({
          response: `file with secure_url ${career.uploadedResumefileName} and public_id ${career.uploadedResumefileNamePublicId} was deleted successfully`,
          deleted: career,
          resumes: resumes
        });
      });
  } 

  catch (err) {
    console.log(err)
    return res.status(404).send({
      error: err,
      response: `Error in deleting file with secure_url ${career.attachmentfileName} and public_id ${career.uploadedResumefileNamePublicId}. - ${err}`,
      resumes: resumes
    });
  }

});

router.get('/:id', [auth, admin], async (req, res) => {
  const career = await Career.findById(req.params.id);

  if (!career) return res.status(404).send('The resume with the given ID was not found.');

  res.send(career);
});

module.exports = router; 