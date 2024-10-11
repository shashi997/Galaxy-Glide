const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        reuire: true,
    }


}, {timestamps: true})


module.exports = mongoose.model('User', userSchema)