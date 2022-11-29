const express = require('express');
const router  =  express.Router();
const nodemailer = require("nodemailer");
const emailData = require('./email.json');
require("dotenv").config();

const sendmail = function sendmail(to,username) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.email,
      pass: process.env.pass,
    },
    tls : { rejectUnauthorized: false }
  });

  const mailOptions = {
    from: process.env.email,
    to: to,
    subject: "Technival Registration",
    subject: "Blockchain Research Lab",
  
    html: `<p>Greetings ${username}, <br><br><b>Team BRL</b> congratulates you on successfully registering for TECHNIVAL EVENT  Get ready to experience enthusiasm at full throttle and show your coding skills among others at this exciting event.<br><br><b>Mode:- Offline<br>Date:- 3rd Dec, 2022<br>Time:- 4pm onwards<br>Venue:- IT Labs</b><br><br>For more information, stay tuned on our Instagram page.<br>https://www.instagram.com/brl_akgec/<br><br>Regards,<br>Team BRL</p>`,
  
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("OTP sent");
    }
  });
}

module.exports = sendmail;