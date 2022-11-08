const express = require('express');
require("./db/student");
const Student = require("./model/Schema");
const studentRouter = require('./router/studentsroutes');

const app = express();
const port = process.env.port || 3000;

app.use(express.json());
app.use(studentRouter);

app.listen(port,() =>{
 console.log(`Conection to the server $(port)`)
});