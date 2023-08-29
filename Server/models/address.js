const mongoose = require('mongoose')
const Schema = mongoose.Schema

const address = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "register",
        required: true
    },
    fullName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    pincode: Number,
})

module.exports = mongoose.model('address', address)