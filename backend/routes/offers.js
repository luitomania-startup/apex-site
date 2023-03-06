const express = require('express');
const router = express.Router();
const { Offer } = require('../models/offer');
const cloudinary = require('cloudinary').v2;
require('../config/cloudinary_config');

const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

router.get('/get-all-offers', async (req, res) => {
  const offers = await Offer.find().sort('-date');
  res.send({ offers: offers });
});


router.get('/get-all-offer-tags', async (req, res) => {
  var result = [];
  var options = {type: 'upload', prefix: "offer_attachments", folder: "offer_attachments", max_results: 500 };

  async function listResources(next_cursor, optionsParam) {
    if (next_cursor) {
      optionsParam["next_cursor"] = next_cursor;
    }
    // console.log(options);
    cloudinary.api.resources(optionsParam, function (error, response) {
      if (error) {
        console.log(error);
      }
      var more = response.next_cursor;
      resources = response.resources;
      for (var response in resources) {
        response = resources[response];
        var resultTemp = [];
        var url = response.secure_url;
        resultTemp.push(url);
        result.push(...resultTemp);
      }

      if (more) { listResources(more, optionsParam); }
      else {
        // console.log("done", result);
        return res.send(result);
      }
    });
  }
  listResources(null, options);
});


router.post('/upload-offer', [auth, admin], async (req, res) => {
  // console.log(req.body)
  let offer = new Offer({
    title: req.body.title,
    description: req.body.description,
    lastDate: req.body.lastDate,
    attachmentFlag: req.body.attachmentFlag,
    attachmentfileName: req.body.uploadedOffer,
    attachmentfileNamePublicId: req.body.uploadedOfferPublic,
  });

  offer = await offer.save();
  // const offers = await Offer.find().sort('-date');
  const offers = await Offer.find().sort('-date');
  res.send({ new: offer, offers: offers });
});


router.delete('/delete/:id', [auth, admin], async (req, res) => {
  const offer = await Offer.findByIdAndRemove(req.params.id);
  const offers = await Offer.find().sort('-date');
  if (offer.attachmentFlag === false) {
    return res.status(200).send({
      response: `No attachment is present with the offer`,
      deleted: offer,
      offers: offers
    });
  }
  if (!offer) return res.status(404).send({response: 'The offer with the given ID was not found.', offers: offers});
  try {
    cloudinary.uploader.destroy(offer.attachmentfileNamePublicId, resource_type='image')
    .then(() => {
      return res.send({
        response: `file with secure_url ${offer.attachmentfileName} and public_id ${offer.attachmentfileNamePublicId} was deleted successfully`,
        deleted: offer,
        offers: offers
      });
    });
  }

  catch (err) {
    console.log(err)
    return res.status(404).send({
      response: `Error in deleting image with the name ${offer.attachmentfileName}=> - ${err}`,
      offers: offers,
      deleted: {}
    });
  }

});

router.get('/get-offer-by-id/:id', async (req, res) => {
  const offer = await Offer.findById(req.params.id);

  if (!offer) return res.status(404).send('The offer with the given ID was not found.');

  res.send({ offer: offer });
});

module.exports = router; 