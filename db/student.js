require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() =>{
    console.log("Connection to MongoDb is successful");
}).catch((e) => {
    console.log("No connection");
});

