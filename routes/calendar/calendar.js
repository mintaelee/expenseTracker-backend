var express = require('express');
var router = express.Router();
let calendarController = require('./controllers/calendarController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/get-expenses', calendarController.getExpenses)

module.exports = router;
