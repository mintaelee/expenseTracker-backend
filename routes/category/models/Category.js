const mongoose = require('mongoose')

let CategorySchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    name: { type: String, unique: false}
})

module.exports = mongoose.model('categories', CategorySchema)