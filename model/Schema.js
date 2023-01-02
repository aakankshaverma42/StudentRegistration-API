const mongoose = require('mongoose');
const validator = require('validator');

const studentSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        roll_no: {
            type: String,
            required: true
        },
        branch: {
            type: String,
            required: true
        },
        year: {
            type: String,
            required: true,
        },
        email_id: {
            type: String,
            required: true,
            unique: [true, "Email id already present"],
            validator(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Invalid Email")
                }
            }
        },
        phone_no: {
            type: Number,
            min: 10,
            required: true,
            unique: true
        },
        leetcode_id:{
            type: String,
            required: true,
        },
        github_id:{
            type: String,
            required: true,
        },
        repo_id:{
            type: String,
            required: true,
        },
})    


const Student = new mongoose.model('Register', studentSchema);

module.exports = Student;