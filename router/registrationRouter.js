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


// route for registration
router.post('/register', verifyCaptcha, async (req, res) => {
  try {
    // console.log(req.body);
    const user = new Student(req.body);
    const createUser = await user.save();
    sendmail(createUser.team.groupA[0].email, createUser.team.groupA[0].name);
    sendmail(createUser.team.groupB[0].email, createUser.team.groupA[0].name);
    res.status(201).send(createUser);
  } catch (e) { console.log(e); res.status(404).send(e); }
});

// router.get('/', async (req, res) => {
//   try {
//     const readUser = await Student.find();
//     res.send(readUser);
//   } catch (e) { res.status('500').send(e) };

// });


// router.get('/:id', async (req, res) => {
//   try {
//     const _id = req.params.id;
//     const studentData = await Student.findById(_id);
//     // console.log(studentData);
//     if (!studentData) {
//       res.status('404').send();
//     }
//     else {
//       res.send(studentData);
//     };
//   } catch (e) {
//     res.status(500).send(e);
//   };
// });


// router.patch('/:id', async (req, res) => {
//   try {
//     const _id = req.params.id;
//     const updateStudent = await Student.findByIdAndUpdate(_id, req.body, {
//       new: true
//     });
//     res.status('202').send(updateStudent);
//   } catch (e) {
//     res.status('400').send(e);
//   }
// })


// router.delete('/:id', async (req, res) => {
//   try {
//     const deleteStudent = await Student.findByIdAndDelete(req.params.id);
//     if (!req.params.id) {
//       res.status(404).send();
//     }
//     else {
//       res.status(202).send(deleteStudent);
//     };
//   } catch (e) {
//     res.status(500).send(e);
//   };
// });

module.exports = router;