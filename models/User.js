const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phoneNumber: {
        type: Number
    },
    password: {
        type:String,
        required:true
    }
})

const User = mongoose.model('User', UserSchema)
module.exports = User