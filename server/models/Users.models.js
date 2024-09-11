const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        maxlength: 32
    },
    email: {
        type: String,
        reuire: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        require: true,
    }


}, {timestamps: true})


module.exports = mongoose.model('User', userSchema)