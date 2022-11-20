require("dotenv").config();
const express = require('express');
require("./db/student");
const Student = require("./model/Schema");
const studentRouter = require('./router/studentsroutes');
const rateLimit = require('express-rate-limit')
const app = express();
const PORT = process.env.PORT || 3000;
const limiter = rateLimit({
  max: 5,
  windowMs: 10000
})
app.get("/",(req,res) => {
  res.send("Hi, Api is working");
})
app.use(express.json());
app.use(studentRouter);

app.listen(PORT,'0.0.0.0',() =>{
 console.log(`Conection to the server ${PORT}`)
});