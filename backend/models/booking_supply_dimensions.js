const Joi = require('joi');
const mongoose = require('mongoose');

const schema =   new mongoose.Schema({
  type : {
    type : 'string',
    required: true
  },
  public_url : {
    type : 'string',
    required: true
  }

},{versionKey:false});

// creating the model 
const Booking_Dimensions = mongoose.model('Booking_dimensions',schema);

module.exports = Booking_Dimensions
