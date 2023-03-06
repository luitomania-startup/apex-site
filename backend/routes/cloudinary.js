const cloudinary = require('cloudinary').v2;
require('../config/cloudinary_config');
const express = require('express');
const cors = require('cors')

const router = express();

var corsOptions = {
    origin: '*',
};
// require('dotenv').config();
// // Be sure to change the cloud_name, api_key, and api_secret to yours below
// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//     secure: true
// });
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

router.get('/events', [auth, admin, cors(corsOptions)], (req, res) => {
    const timestamp = Math.round((new Date).getTime() / 1000);
    signature = cloudinary.utils.api_sign_request({
        ...req.query,
        source: 'uw',
        tags: ['events'],
        upload_preset: 'event_attachments',
        timestamp: timestamp
    },
        cloudinary.config().api_secret
    );
    res.send({signature, timestamp});
});

router.get('/offers', [auth, admin, cors(corsOptions)], (req, res) => {
    const timestamp = Math.round((new Date).getTime() / 1000);
    signature = cloudinary.utils.api_sign_request({
        ...req.query,
        source: 'uw',
        tags: ['offers'],
        upload_preset: 'offer_attachments',
        timestamp: timestamp
    },
        cloudinary.config().api_secret
    );
    res.send({signature, timestamp});
});

router.get('/gallery', [auth, admin, cors(corsOptions)], (req, res) => {
    const timestamp = Math.round((new Date).getTime() / 1000);
    signature = cloudinary.utils.api_sign_request({
        ...req.query,
        source: 'uw',
        tags: ['galleryUpload'],
        upload_preset: 'gallery',
        timestamp: timestamp
    },
        cloudinary.config().api_secret
    );
    res.send({signature, timestamp});
});

router.get('/career', cors(corsOptions), (req, res) => {
    const timestamp = Math.round((new Date).getTime() / 1000);
    signature = cloudinary.utils.api_sign_request({
        ...req.query,
        source: 'uw',
        tags: ['career'],
        upload_preset: 'career',
        timestamp: timestamp
    },
        cloudinary.config().api_secret
    );
    res.send({signature, timestamp});
});

router.get('/booking', cors(corsOptions), (req, res) => {
    const timestamp = Math.round((new Date).getTime() / 1000);
    signature = cloudinary.utils.api_sign_request({
        ...req.query,
        source: 'uw',
        tags: ['booking'],
        upload_preset: 'booking',
        timestamp: timestamp
    },
        cloudinary.config().api_secret
    );
    res.send({signature, timestamp});
});

module.exports = router;