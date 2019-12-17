const mongoose = require('mongoose')

let CalendarSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    expenses: [{ 
        type: mongoose.Schema.Types.ObjectId, ref: 'expenses'
    }],
    categories: [{ 
        type: mongoose.Schema.Types.ObjectId, ref: 'categories'
    }]
})

module.exports = mongoose.model('calendars', CalendarSchema)