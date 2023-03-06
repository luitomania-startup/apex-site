const Joi = require('joi');
const mongoose = require('mongoose');

const Offer = mongoose.model('Offer', new mongoose.Schema({

      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        default: ""
      },
      lastDate: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now()
      },
      attachmentFlag: {
        type: Boolean,
        default: false
      },
      attachmentfileName:  {
        type: String
      },
      attachmentfileNamePublicId:  {
        type: String
      }
}));

// function validateOffer(offer) {
//   const schema = {
//     customerId: Joi.objectId().required(),
//     movieId: Joi.objectId().required()
//   };

//   return Joi.validate(offer, schema);
// }

exports.Offer = Offer; 
// exports.validate = validateOffer;