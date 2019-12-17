const Category = require('../models/Category')
const Calendar = require('../../calendar/models/Calendar')

module.exports = {
    createCategory: async (req,res) => {
        let id = req.body.id
        let name = req.body.name
        try {
            let foundCalendar = await Calendar.findOne({user_id: id})
            let newCategory = await new Category({
                user_id: id,
                name: name
            })
            console.log(newCategory)
            let savedNewCategory = await newCategory.save()
            await foundCalendar.categories.push(savedNewCategory)
            await foundCalendar.save()
            res.status(200).json(savedNewCategory)

        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    },
    getUserCategories: async (req, res) => {
        let id = req.query.id
        try {
            let foundCategories = await Category.find({user_id: id})
            res.status(200).json(foundCategories)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}