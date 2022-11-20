require("dotenv").config();
const express = require('express');
require("./db/student");
const Student = require("./model/Schema");
const studentRouter = require('./router/studentsroutes');
const rateLimit = require('express-rate-limit')
const app = express();
const port = process.env.port || 3000;
const limiter = rateLimit({
  max: 5,
  windowMs: 10000
})

app.use(express.json());
app.use(studentRouter);

app.listen(port,() =>{
 console.log(`Conection to the server ${port}`)
});