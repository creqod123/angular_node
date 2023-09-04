const mongoose = require('mongoose')
const Schema = mongoose.Schema

const register = new Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    type: String
})

module.exports = mongoose.model('register', register)