require("dotenv").config();
const express = require('express');
const  cors = require('cors')
require("./db/student");
const rateLimit = require('express-rate-limit');
const PORT = process.env.PORT || 3000;
const registrationRouter = require('./router/registrationRouter');

const app = express();

const limiter = rateLimit({
  max: 5,
  windowMs: 60 * 1000
});
app.use(limiter)

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.get("/",(req,res) => {
  res.send("The Api is working..");
});

app.use("/api/v1", registrationRouter);

app.listen(PORT,'0.0.0.0',() =>{
 console.log(`Conection to the server ${PORT}`)
});
