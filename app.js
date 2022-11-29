require("dotenv").config();
const express = require('express');
const  cors = require('cors')
require("./db/student");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const Student = require("./model/Schema");
const studentRouter = require('./router/studentsroutes');
const rateLimit = require('express-rate-limit');
const bodyParser = require("body-parser");
const nodemailer = require('nodemailer');
// const mail  = require('./services/mailer')

const { request, response } = require("express");
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
const PORT = process.env.PORT || 3000;

const limiter = rateLimit({
  max: 5,
  windowMs: 10000
})
 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



app.get('/',(_,res) => res.sendFile(__dirname + '/view/index.html'));
app.post('/index.html', async (req, res) => {
  if (!req.body.captcha)
    return res.json({ success: false, msg: 'Please select captcha' });

  //Verify URL
  const query = JSON.stringify({
    secret: secretKey,
    response: req.body.captcha,
    remoteip: req.connection.remoteAddress
  });
  const verifyURL = `https://google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET_KEY}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddresss}`;
 
  // Make Request To VerifyURL
  const body = await fetch(verifyURL).then(res => res.json());
  console.log(body);
   //If not Successful
   if (body.success !== undefined && !body.success)
   return res.json({ success: false, msg: 'Failed captcha verification' });

   //If Successful (in this we can also add the node mailer for email sending or db saving )
  return res.json({ success: true, msg: 'Captcha passed' });
});

app.get("/",(req,res) => {
  res.send("Hi, Api is working");
});
app.use(express.json());
app.use("/api/v1",studentRouter);
// app.use("/",mail);



app.listen(PORT,'0.0.0.0',() =>{
 console.log(`Conection to the server ${PORT}`)
});
