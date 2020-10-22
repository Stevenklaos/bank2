const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const user = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: [true,'Username already exists']
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    registeredDate: {
        type: Date,
        default: Date.now
    }
});
user.plugin(uniqueValidator, { message: 'already exists' });
module.exports = mongoose.model('User', user);