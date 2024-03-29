const mongoose = require('mongoose')
const moment = require('moment')
const now = moment()

let UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        default: ''
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        require: true,
        default: ''
    },
    calendar: { type: mongoose.Schema.Types.ObjectId, ref: 'calendars'},
    password: { type: String, default: '' },
    timestamp: { type: String, default: now.format('dddd, MMMM Do YYYY, h:mm:ss a')}
})

module.exports = mongoose.model('users', UserSchema)