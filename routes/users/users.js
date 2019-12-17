var express = require('express');
var router = express.Router();
let userController = require('./controllers/userController')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/sign-up', userController.signup)
router.post('/sign-in', userController.signin)

module.exports = router;
