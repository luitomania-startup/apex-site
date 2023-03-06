const express = require("express");
const app = express();
const router = express.Router();
const Booking = require("../models/booking");
const Booking_Dimensions  = require('../models/booking_supply_dimensions')
const { sendMessageEmail } = require("../emails/accounts_booking");

////////  API Methods For Supply Dimension/////////


router.post('/Add_dimension', async (req,res)=>{
  if (!req.body) return res.status(404).send("Body empty");
  const {type, public_url} = req.body;

  /// create new booking_dimension document 

  const newdoc = new Booking_Dimensions(req.body)
  
  try{
     newdoc.save()
     .then(()=>{
      return res.status(200).send({message:"Successfully saved document"});
     })
  }
  catch(err){
    return res.status(404).send({message:"Unable to save document",err: err.message});
  }
})


router.post('/getDimensionData',async (req,res)=>{
  // console.log(req.body);
  if (!req.body) return res.status(404).send("Body empty");
  const {type} = req.body;
  const foundDoc = await Booking_Dimensions.findOne({type:type});
  //  console.log(foundDoc)
  if(foundDoc==null) return res.status(404).send({message :"Type does not exist"});

  return res.status(200).send({message : "found", public_url : foundDoc.public_url})
})


////////  API Method For Mailsending /////////
router.post("/sendEmail", (req, res) => {
  // console.log(req.body);
  if (!req.body) return res.status(404).send("Body empty");
  // const {fname,lname,mobile,email,message} = req.body;
  // console.log(email)
  try {
    sendMessageEmail(req.body);
    return res.status(200).send({ message: "Message successfully sent" });
  } catch (err) {
    return res.status(404).send(err.message);
  }
});



////////  API Methods For BookingAdmin /////////
// GET /getAllTypes

router.get("/getAllTypes", async function (req, res) {
  const types = await Booking.find({}, { _id: 0 });
  if (types.length == 0) return res.status(400).send("Database empty");
  // console.log(types);
  res.status(200).send(types);
});

router.post("/addNewCategory", async function (req, res) {
  //  res.send('hello')
  const newBooking = new Booking({ ...req.body });
  newBooking
    .save()
    .then(async () => {
      // return all data from the backend once updated
      const findAll = await Booking.find({});
      return res.status(201).send(findAll);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.post("/addNewTypeValue", async (req, res) => {
  if (Object.keys(req.body).length == 0)
    return res.status(404).send("Body cannot be empty");

  const { category, type, newvalue } = req.body; // here key is category type

  const found = await Booking.findOne({ category: category });

  if (found.length == 0) return res.status(400).send({ message: "Category not found" });

  //check if categoryType is present or not
  const foundType = Object.keys(found.types).filter((x) => x == type);

  if (foundType.length == 0) {
    // if categoryType is not present

    let newdata;
    
    if(newvalue != '')
    newdata = { ...found.types, [type]: [newvalue] };
    else newdata = { ...found.types, [type]: [] };

    const updated = await Booking.findOneAndUpdate(
      { category: category },
      { types: newdata },
      { new: true }
    );

    const findUpdatedAll = await Booking.find({});

    return res.status(200).send(findUpdatedAll);
  }

  found.types[type].push(newvalue);
  const newdata = found.types[type];
  const updated = await Booking.findOneAndUpdate(
    { category: category },
    { [`types.${type}`]: newdata },
    { new: true }
  );
  // console.log("UDPATED: " + updated);
  const findUpdatedAll = await Booking.find({});
  return res.status(200).send(findUpdatedAll);
});

router.post('/updateTypeName',async (req, res) => {

  // check if body is empty
  if (Object.keys(req.body).length == 0)
    return res.status(404).send("Body cannot be empty");

  const {category,type, newType} = req.body;
  
  // find the category 

  const found = await Booking.findOne({category: category});

  if (found.length == 0) return res.status(400).send({ message: "Category not found" });

  //check if categoryType is present or not
  const foundType = Object.keys(found.types).filter((x) => x == type);
 
  if( foundType.length == 0 ) return res.status(404).send({ message: "CategoryType not found" });

  found.types[newType] = found.types[type];

  delete found.types[type];

  
  const updated = await Booking.findOneAndUpdate(
    { category: category },
    { types: found.types }
  );

  // return all data after update 

  const findAllUpdated = await Booking.find({});

  return res.status(200).send(findAllUpdated);


});

router.post('/updateTypeValue', async (req, res) => {
  // check if body is empty
  if (Object.keys(req.body).length == 0)
    return res.status(404).send("Body cannot be empty");

  const {category,type, oldvalue, newvalue} = req.body;
  
  // find the category 

  const found = await Booking.findOne({category: category});

  if (found.length == 0) return res.status(400).send({ message: "Category not found" });

  //check if categoryType is present or not
  const foundType = Object.keys(found.types).filter((x) => x == type);
 
  if( foundType.length == 0 ) return res.status(404).send({ message: "CategoryType not found" });

  const index  = found.types[type].indexOf(oldvalue);

  if(index == -1) return res.status(404).send({ message: " CategoryType Value not found" })
  
  found.types[type][index] = newvalue;
  
  const updated = await Booking.findOneAndUpdate(
    { category: category },
    { types: found.types }
  );

  // return all data after update 

  const findAllUpdated = await Booking.find({});

  return res.status(200).send(findAllUpdated);


})

router.delete("/deleteType", async (req, res) => {
  if (Object.keys(req.body).length == 0)
    return res.status(404).send({ message: "Body cannot be empty" });
  const { category, type } = req.body;

  const found = await Booking.findOne({ category: category });
  if (found.length == 0) return res.status(400).send({ message: " Category not found" });

  // check if type is empty 

  if(type == '') return res.status(404).send({message: "Type cannot be empty"})

  //check if categoryType is present or not
  const foundType = Object.keys(found.types).filter((x) => x == type);

  if (foundType.length == 0)
    return res.status(404).send({ message: "Type not found" });
  delete found.types[type];

  const updated = await Booking.findOneAndUpdate(
    { category: category },
    { types: found.types }
  );

  const findUpdatedAll = await Booking.find({});

  return res.status(200).send(findUpdatedAll);
});

router.delete("/deleteTypeValue", async (req, res) => {
  if (Object.keys(req.body).length == 0)
    return res.status(404).send({ message: "Body cannot be empty" });
  const { category, type, value } = req.body;

  const found = await Booking.findOne({ category: category });
  if (found.length == 0)
    return res.status(400).send({ message: "Category not found" });

  //check if categoryType is present or not
  const foundType = Object.keys(found.types).filter((x) => x == type);

  if (foundType.length == 0)
    return res.status(404).send({ message: "Category Type not found" });

  // found
  // find the index of the categoryType value

  const index = found.types[type].indexOf(value);

  if(index == -1) return res.status(404).send({ message: " CategoryType Value not found" })
  
  // console.log(index);
  // remove the value at the index

  found.types[type] = [
    ...found.types[type].slice(0, index),
    ...found.types[type].slice(index + 1),
  ];

  // console.log(found.types[type]);

  const updated = await Booking.findOneAndUpdate(
    { category: category },
    { types: found.types }
  );

  const findUpdatedAll = await Booking.find({});

  return res.status(200).send(findUpdatedAll);
});

module.exports = router;
