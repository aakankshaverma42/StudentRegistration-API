require("dotenv").config();
const express = require('express');
const  cors = require('cors')
require("./db/student");
const Student = require("./model/Schema");
const studentRouter = require('./router/studentsroutes');
const rateLimit = require('express-rate-limit')
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
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "OPTION,GET,POST,PUT,PATCH,DELETE"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type"
//   );
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   next();
// });



app.get("/",(req,res) => {
  res.send("Hi, Api is working");
})
app.use(express.json());
app.use(studentRouter);

app.listen(PORT,'0.0.0.0',() =>{
 console.log(`Conection to the server ${PORT}`)
});