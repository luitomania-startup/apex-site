const Joi = require('joi');
const mongoose = require('mongoose');
// const CategoryType  = mongoose.Schema({
//   categoryType:{
//     type : 'Arr'
//   }
// })
const bookingSchema =   new mongoose.Schema({
  category : {
    type : 'string',
    required: true
  },
  types : {
    type : 'object',
    required: true
  }

},{versionKey:false});

// creating the model 
const Booking = mongoose.model('Booking',bookingSchema);

// function validateCareer(career) {
//   // const schema = {
//   //   name: Joi.string().min(5).max(50).required(),
//   //   phone: Joi.string().min(5).max(50).required(),
//   //   isGold: Joi.boolean()
//   // };

//   return true//Joi.validate(post, schema);
// }

module.exports = Booking;
// exports.validate = validatePost;