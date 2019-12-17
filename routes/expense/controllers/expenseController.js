const Expense = require('../models/Expense')
const Calendar = require('../../calendar/models/Calendar')
const Category = require('../../category/models/Category')
const { fillTransaction, checkAndAddTransaction } = require('./fileHelper')

module.exports = {
    createExpense: async (req,res) => {
        let id = req.body.id
        let name = req.body.name
        let amount = req.body.amount
        let category = req.body.category
        let date = req.body.date
        try {
            let foundCalendar = await Calendar.findOne({user_id: id})
            let newExpense = await new Expense({
                user_id: id,
                name: name,
                amount: Number(amount).toFixed(2),
                category_id: category,
                date: date
            })
            let savedNewExpense = await newExpense.save()
            await foundCalendar.expenses.push(savedNewExpense)
            await foundCalendar.save()
            res.status(200).json(savedNewExpense)

        } catch (error) {
            res.status(500).json(error)
        }
    },
    editExpense: async (req,res) => {
        let id = req.body.id
        let name = req.body.name
        let amount = req.body.amount
        let category = req.body.category
        let date = req.body.date
        try {
            let foundExpense = await Expense.findById(id)
            foundExpense.name = name
            foundExpense.amount = Number(amount).toFixed(2)
            foundExpense.category_id = category
            foundExpense.date = date
            let savedExpense = await foundExpense.save()
            res.status(200).json(savedExpense)

        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    deleteExpense: async (req, res) => {
        let userID = req.query.userID
        let id = req.query.id
        try {
            console.log(userID, id)
            let foundCalendar = await Calendar.findOne({user_id: userID})
            let deletedExpense = await Expense.findByIdAndDelete(id)
            await foundCalendar.expenses.pull(id)
            await foundCalendar.save()
            res.status(200).json(deletedExpense)
        } catch (error){
            console.log(error)
            res.status(500).json(error)
        }
    },
    uploadExpenses: async (req,res) => {
        let id = req.body.id
        let bankName = req.body.bankName
        let transactions = req.body.transactions
        // let categories = [...new Set(transactions.map(transaction => transaction.category))]
        try {
            // let categoryChecked = await checkCategories(categories, id)
            // console.log('before filling transactions')
            let results = []
            let i = 0
            while (i < transactions.length){
                let filledTransaction = await fillTransaction(transactions[i], id)
                let result = await checkAndAddTransaction(filledTransaction, bankName, id)
                console.log('inside while loop: ',result)
                results.push(result)
                i += 1
            }
            console.log('after while loop: ', results)
            res.status(200).json(results)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
        
    }
}