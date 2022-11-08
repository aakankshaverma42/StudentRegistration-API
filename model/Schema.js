const mongoose = require('mongoose');
const validator = require('validator');

const studentSchema = new mongoose.Schema({
    firstName :{
        type: String,
        index: true,
        required: true
    },
    lastName : {
        type: String,
        index: true,
        required: true
    },
    emailId: {
        type:  String,
        required: true,
        unique: [true,"Email id already present"],
        validator(value){
            if(!validator.isEmail(value)){
             throw new Error("Invalid Email")
            }
        }
    },
    phone: {
        type: Number,
        min: 10,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true,
    }
});

//we will create a new collection for model
const Student = new mongoose.model('Student',studentSchema);

module.exports = Student;