const Joi = require('joi');
const mongoose = require('mongoose');

const Career = mongoose.model('Career', new mongoose.Schema({
  fName: {
    type: String,
    required: true
  },
    lName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    mobile: {
      type: String,
      required: true
    },
    position: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    resume: {
      type: String,
      required: true
    },
    uploadedResumefileName: {
      type: String,
      required: true
    },
    uploadedResumefileNamePublicId: {
      type: String,
      required: true
    },
    dateUploaded: {
      type: Date,
      default: Date.now()
    }
}));

function validateCareer(career) {
  // const schema = {
  //   name: Joi.string().min(5).max(50).required(),
  //   phone: Joi.string().min(5).max(50).required(),
  //   isGold: Joi.boolean()
  // };

  return true//Joi.validate(post, schema);
}

exports.Career = Career; 
// exports.validate = validatePost;