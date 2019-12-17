const Calendar = require('../../calendar/models/Calendar')
const Expense = require('../../expense/models/Expense')

module.exports = {
    getExpenses: async (req,res) => {
        let id = req.query.id
        let startDate = req.query.startDate
        let endDate = req.query.endDate
        
        try {
            let foundCalendar = await Calendar.findOne({user_id: id})
            let populatedCalendar = await Calendar.populate(foundCalendar, 'expenses')
            let expenses = populatedCalendar.expenses.filter((expense) => {
                if ((expense.date >= startDate) && (expense.date <= endDate)){
                    return expense
                }
            })
            res.status(200).json(expenses)

        } catch (error) {
            res.status(500).json(error)
        }
    }
}