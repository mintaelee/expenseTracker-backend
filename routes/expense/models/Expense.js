const mongoose = require('mongoose')

let ExpenseSchema = new mongoose.Schema({
    name: { type: String, default: '' },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'categories' },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    amount: { type: Number, default: 0 },
    date: { type: String, default: '' },
    transactionType: { type: String, default: '' },
    reference: { type: String, default: ''}
})

module.exports = mongoose.model('expenses', ExpenseSchema)