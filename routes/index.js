const expres = require('express');

const router = expres.Router();
const homeController = require('../controllers/homeController');

router.get('/', homeController.home);
router.use('/auth', require('./auth'));
router.use('/user', require('./user'));
router.use('/habit', require('./habit'));

module.exports = router;
