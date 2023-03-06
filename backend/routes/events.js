const express = require('express');
const router = express.Router();
const { Event } = require('../models/event');
const cloudinary = require('cloudinary').v2;
require('../config/cloudinary_config');

const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

router.get('/get-all-events', async (req, res) => {
  const events = await Event.find().sort('-date');
  res.send({ events: events });
});


router.get('/get-all-event-tags', async (req, res) => {
  var result = [];
  var options = {type: 'upload', prefix: "event_attachments", folder: "event_attachments", max_results: 500 };

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


router.post('/upload-event-with-attachment', [auth, admin], async (req, res) => {
  // console.log(req.body)
  let event = new Event({
    title: req.body.title,
    description: req.body.description,
    summary: req.body.summary,
    date: req.body.date,
    attachmentFlag: true,
    attachmentfileName: req.body.uploadedEvent,
    attachmentfileNamePublicId: req.body.uploadedEventPublic,
  });

  event = await event.save();
  // const events = await Event.find().sort('-date');
  const events = await Event.find().sort('-date');
  res.send({ new: event, events: events });
});
router.post('/upload-event-without-attachment', [auth, admin], async (req, res) => {
  // console.log(req.body)
  let event = new Event({
    title: req.body.title,
    description: req.body.description,
    summary: req.body.summary,
    date: req.body.date,
    attachmentFlag: false,
    attachmentfileName: "",
    attachmentfileNamePublicId: ""
  });
  event = await event.save();
  // const events = await Event.find().sort('-date');
  const events = await Event.find().sort('-date');
  res.send({ new: event, events: events });
});


router.delete('/delete/:id', [auth, admin], async (req, res) => {
  const event = await Event.findByIdAndRemove(req.params.id);
  const events = await Event.find().sort('-date');
  if (event.attachmentFlag === false) {
    return res.status(200).send({
      response: `No attachment is present with the event`,
      deleted: event,
      events: events
    });
  }
  if (!event) return res.status(404).send({response: 'The event with the given ID was not found.', events: events});
  try {
    cloudinary.uploader.destroy(event.attachmentfileNamePublicId, resource_type='image')
    .then(() => {
      return res.send({
        response: `file with secure_url ${event.attachmentfileName} and public_id ${event.attachmentfileNamePublicId} was deleted successfully`,
        deleted: event,
        events: events
      });
    });
  }

  catch (err) {
    console.log(err)
    return res.status(404).send({
      response: `Error in deleting image with the name ${event.attachmentfileName}=> - ${err}`,
      events: events,
      deleted: {}
    });
  }

});

router.get('/get-event-by-id/:id', async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) return res.status(404).send('The event with the given ID was not found.');

  res.send({ event: event });
});

module.exports = router; 