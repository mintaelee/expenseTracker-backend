var express = require('express');
var router = express.Router();
let expenseController = require('./controllers/expenseController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create-expense', expenseController.createExpense)

router.post('/edit-expense', expenseController.editExpense)

router.delete('/delete-expense', expenseController.deleteExpense)

router.post('/upload-transactions', expenseController.uploadExpenses)

module.exports = router;
