const express = require('express');
const router = express.Router();
const Student = require("../model/Schema")
const rateLimit = require('express-rate-limit')
const sendmail = require("../services/mailer")
const fetch = require("isomorphic-fetch");


// Middleware for verifying the captcha
const verifyCaptcha = async (req, res, next) => {
  console.log(req.body);
  const { captchaToken } = req.body;
  const secretKey = process.env.CAPTCHA_SECRET_KEY;

  console.log(captchaToken);
  console.log("Secret Key", secretKey);

  const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaToken}`;

  fetch(url, {
    method: "post",
  })
    .then((response) => response.json())
    .then((google_response) => {
      if (google_response.success == true) {
        next();
      } else {
        res.json({ status: 0, error: "Captcha verification Failed" });
      }
    })
    .catch((error) => {
      res.json({ status: 0, message: "Error in verifying captcha" });
    });
};

// Function for registering at code auction
const register_to_code_auction = async (req_body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = "https://code-auction-backend.up.railway.app/auth/register"

      const data = {
        team_name: req_body.team.teamname,
        password: req_body.team.password
      }
      const member_data = []

      req_body.team.groupA.forEach((member, index) => {
        member_data.push({
          name: member.name,
          email: member.email,
          phone: member.phoneNo,
        })
      })
      req_body.team.groupB.forEach((member, index) => {
        member_data.push({
          name: member.name,
          email: member.email,
          phone: member.phoneNo,
        })
      })

      member_data.forEach((member, index) => {
        if (index == 0) {
          data['leader_name'] = member.name
          data['leader_email'] = member.email
        } else {
          data[`member_${index}_name`] = member.name
          data[`member_${index}_email`] = member.email
        }
      })

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      resolve(json);
    } catch (error) {
      reject(error);
    }
  });
};

// route for registration
router.post('/register', verifyCaptcha, async (req, res) => {
  try {
    // console.log(req.body);
    const user = new Student(req.body);
    const createUser = await user.save();

    // After saving the data in the database, we will send the data to the code auction backend
    await register_to_code_auction(req.body);

    // sendmail(createUser.team.groupA[0].email, createUser.team.groupA[0].name);
    // sendmail(createUser.team.groupB[0].email, createUser.team.groupA[0].name);
    res.status(201).send(createUser);
  } catch (e) { console.log(e); res.status(404).send(e); }
});

module.exports = router;