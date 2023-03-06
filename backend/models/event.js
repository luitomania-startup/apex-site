const Joi = require('joi');
const mongoose = require('mongoose');

const Event = mongoose.model('Event', new mongoose.Schema({

      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        default: ""
      },
      summary: {
        type: String,
        default: ""
      },
      date: {
        type: String,
        required: true
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

exports.Event = Event; 
// exports.validate = validateOffer;