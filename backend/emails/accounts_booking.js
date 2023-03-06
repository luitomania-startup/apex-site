const path = require('path')
const nodemailer = require("nodemailer");
require('dotenv').config();
const sendMessageEmail = async (data)=>{
    const skip = ['name','email','contact','address'];
    const {name,email,contact} = data; 
    let str = '<ul>';
    for([key,value] of Object.entries(data)){
        if(skip.includes(key)) continue;
        str+= `<li>${key}: ${value}</li>`
    }
    
    str+='</ul>';
   

    let output = `
    <h1>Requirement Details from ${name} </h1>`
    if(data.addresss) output+=`<ul>
    <li> Name: ${name}</li>
    <li> Contact No : ${contact}</li>
    <li> Email: ${email}</li>
    <li> Address ${data.address}</li>
</ul>`
    else 
    output+=`
    
    <h3> Contact Details</h3>
    <ul>
        <li> Name: ${name}</li>
        <li> Contact No : ${contact}</li>
        <li> Email: ${email}</li>
    </ul>
    <h3> Requirement</h3>`+str;

    let transporter = nodemailer.createTransport({
        host: "smtppro.zoho.in",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.NODEMAILER_EMAIL, // generated ethereal user
          pass: process.env.NODEMAILER_PASS, // Make sure to generate Application-specific-password if 2FA is enabled
        },
        tls:{
            rejectUnauthorized: false // this must be set to false if the site is localhost or anything other than the domain
        }
      });
    
      // send mail with defined transport object
      // try{
        let info = await transporter.sendMail({
          from: process.env.NODEMAILER_RELAY, // sender address
          to: process.env.NODEMAILER_EMAIL, // list of receivers
          subject: `You have a new Booking Requirement Request`, // Subject line
          text: "Hello world?", // plain text body
          html: output, // html body
          priority: 'high',
        });

      // }
      // catch(err){
      //   return err.message;
      // }
      
}

module.exports = {
    sendMessageEmail
}


/*
 steps to enable Application Specific Password
    1.Login to Zoho Accounts
    2. From the left menu, navigate to Security and click App passwords
    3.Click Generate New Password.
 */


// Configuration steps for SMTP : https://www.zoho.com/mail/help/imap-access.html#:~:text=If%20your%20domain%20is%20hosted,format%20you%40yourdomain.com.