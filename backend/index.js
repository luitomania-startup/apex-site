const _ = require('lodash');
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();

const downtimeTest = require('./routes/downtimeTest');
const events = require('./routes/events');
const images = require('./routes/images');
const offers = require('./routes/offers');
const careers = require('./routes/careers');
const contact = require('./routes/contact');
const booking = require('./routes/booking');
const cloudinary = require('./routes/cloudinary');
const auth = require('./routes/auth');
const users = require('./routes/users');

const chalk = require('chalk');
const hagen = require("hagen").default;

require('dotenv').config()
hagen.info('MongoUrl', chalk.blue.bold(process.env.MONGO_PATH))
mongoose.connect(process.env.MONGO_PATH, {
  dbName: 'apex'
})
  .then(() => hagen.success('MongoSuccess', chalk.bgBlueBright.whiteBright.underline.bold('Connected to MongoDB...')))
  .catch(err => hagen.error('MongoError', chalk.bgRed.whiteBright.underline.bold('Could not connect to MongoDB...')));
// mongoose.connect(process.env.MONGO_PATH, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: true,
//   dbName: 'apex'
// })
//   .then(() => console.log('Connected to MongoDB...'))
//   .catch(err => console.error('Could not connect to MongoDB...'));

// mongoose.connect('mongodb://127.0.0.1:27017/apex-site',{
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: true,
//   dbName: 'apex-site'
// })
//   .then(() => console.log('Connected to MongoDB...'))
//   .catch(err => console.error('Could not connect to MongoDB...'));

app.use(function (req, res, next) {
  const allowedOrigins = ['https://localhost:8888', 'https://apexconst.in', 'https://www.apexconst.in'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/downtime-test', downtimeTest);

app.use('/api/events', events);
app.use('/api/images', images);
app.use('/api/offers', offers);
app.use('/api/careers', careers);
app.use('/api/contact', contact);
app.use('/api/booking', booking);
app.use('/api/cloudinary', cloudinary);
app.use('/api/login', auth)
app.use('/api/users', users)


if (!config.get('jwtPrivateKey')) {
  hagen.error('JWTError', 'FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

const port = process.env.PORT || 3000;
app.listen(port, () => hagen.success('PORT', chalk.green.bgWhite.bold(`Listening on port ${port}...`)));