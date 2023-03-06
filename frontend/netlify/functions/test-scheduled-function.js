const { schedule } = require('@netlify/functions');
const axios = require('axios');
const url = "https://apex-backend.onrender.com/downtime-test";
const url2 = "http://127.0.0.1:3000/downtime-test";

const handler = async function(event, context) {
    console.log("Received event:", event);
    try{
        const res = await axios.get(url);
        console.log("Status:", res.data);
    }
    catch(err){
        return {
            statusCode: 500
        };
    }
    return {
        statusCode: 200,
    };
};

exports.handler = schedule("*/10 * * * *", handler);