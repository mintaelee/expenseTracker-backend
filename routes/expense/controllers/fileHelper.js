const Expense = require('../models/Expense')
const Calendar = require('../../calendar/models/Calendar')
const Category = require('../../category/models/Category')

async function fillTransaction(transaction, userID){
    let categoryID = ''
    let foundCalendar = await Calendar.findOne({user_id: userID})

    if (transaction.category === '' || transaction.category === 'UNIDENTIFIED'){
        let foundSimilarExpense = await Expense.findOne({
            user_id: userID,
            name: transaction.name
        })
        if (foundSimilarExpense){
            categoryID = foundSimilarExpense.category_id
        } else {
            transaction.category = 'UNIDENTIFIED'
        }
    }
    let foundCategory = await Category.findOne({
        user_id: userID,
        name: transaction.category
    })
    if (foundCategory === null){
        let newCategory = await new Category({
            user_id: userID,
            name: transaction.category
        })
        let savedNewCategory = await newCategory.save()
        await foundCalendar.categories.push(savedNewCategory)
        await foundCalendar.save()
        categoryID = savedNewCategory._id
    } else {
        categoryID = foundCategory._id
    }
    transaction.category = categoryID
    return transaction
}

async function checkAndAddTransaction(transaction, transactionType, userID){
    let resultObj = {
        success: false,
        message: '',
        data: null
    }
    let foundCalendar = await Calendar.findOne({user_id: userID})
    
    let foundExpense = await Expense.findOne({
        user_id: userID,
        reference: transaction.reference
    })
    if (foundExpense){
        resultObj.message = 'Duplicate transaction!'
        resultObj.data = foundExpense
        return resultObj
    } else {
        
        let newExpense = await new Expense({
            user_id: userID,
            name: transaction.name,
            amount: Number(transaction.amount).toFixed(2),
            category_id: transaction.category,
            date: transaction.date,
            transactionType: transactionType,
            reference: transaction.reference
        })
        let savedNewExpense = await newExpense.save()
        await foundCalendar.expenses.push(savedNewExpense)
        await foundCalendar.save()
        resultObj = {
            success: true,
            message: 'Successfully added transaction',
            data: savedNewExpense
        }
        return resultObj
    }
}

module.exports = {
    fillTransaction,
    checkAndAddTransaction
}