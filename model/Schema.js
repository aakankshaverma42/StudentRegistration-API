const mongoose = require('mongoose');
const validator = require('validator');

const subSchema1 = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rollNo: {
        type: Number,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    hosteler: {
        type: String,
        required: true,
        // enum : [ 'YES (Boys Hostel)', 'YES (Girls Hostel)', 'NO']
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email id already present"],
        validator(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email")
            }
        }
    },
    phoneNo: {
        type: Number,
        min: 10,
        required: true,
        unique: true
    },
},
    {
        timestamp: true,
    });

const subSchema2 = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rollNo: {
        type: Number,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    hosteler: {
        type: String,
        required: true,
        // enum : [ 'YES (Boys Hostel)', 'YES (Boys Hostel)', 'NO']
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email id already present"],
        validator(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email")
            }
        }
    },
    phoneNo: {
        type: Number,
        min: 10,
        required: true,
        unique: true
    },
},
    {
        timestamp: true,
    });


const studentSchema = new mongoose.Schema({
    team: {
        teamname: {
            type: String,
            required: true
        },
        groupA: [subSchema1],
        groupB: [subSchema2],
    },
});

const Student = new mongoose.model('Student', studentSchema);

module.exports = Student;