var express = require('express');
var router = express.Router();
let categoryController = require('./controllers/categoryController')

/* GET users listing. */
router.post('/create-category', categoryController.createCategory)
router.get('/get-user-categories', categoryController.getUserCategories)

module.exports = router;
