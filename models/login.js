const mongoose = require('mongoose');
const {isEmail} = require('validator');

const loginSchema = mongoose.Schema({
    email: {
        type: String,
        validate: [isEmail, 'Incorrect Email']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    }
});


module.exports = mongoose.model('Login', loginSchema);
