const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
require('../config/cloudinary_config');

const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

router.get('/images-list', async (req, res) => {
  var result = [];
  var options = { resource_type: 'image', type: 'upload', prefix: "galleryUpload", folder: "galleryUpload", max_results: 500 };

  async function listResources(next_cursor) {
    if (next_cursor) {
      options["next_cursor"] = next_cursor;
    }
    // console.log(options);
    cloudinary.api.resources(options, function (error, response) {
      if (error) {
        console.log(error);
      }
      var more = response.next_cursor;
      resources = response.resources;
      for (var response in resources) {
        response = resources[response];
        var resultTemp = [];
        var url = { "secure_url": response.secure_url, "public_id": response.public_id };
        resultTemp.push(url);
        result.push(...resultTemp);
      }

      if (more) { listResources(more); }
      else {
        // console.log("done", result);
        return res.send(result);
      }
    });
  }
  listResources(null);
});

router.post('/delete', [auth, admin], async (req, res) => {
  // console.log("test", req.body.id)
  var result = [];
  var options = { resource_type: 'image', type: 'upload', prefix: "galleryUpload", folder: "galleryUpload", max_results: 500 };

  async function listResources(next_cursor) {
    if (next_cursor) {
      options["next_cursor"] = next_cursor;
    }
    // console.log(options);
    cloudinary.api.resources(options, function (error, response) {
      if (error) {
        console.log(error);
      }
      var more = response.next_cursor;
      resources = response.resources;
      for (var response in resources) {
        response = resources[response];
        var resultTemp = [];
        var url = { "secure_url": response.secure_url, "public_id": response.public_id };
        resultTemp.push(url);
        result.push(...resultTemp);
      }

      if (more) { listResources(more); }
      else {
        // console.log("done", result);
        return res.send(result);
      }
    });
  }

  cloudinary.uploader.destroy(req.body.id, resource_type='image')
    .then(res => {
      listResources(null);
    });
});

module.exports = router; 