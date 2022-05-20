const expres = require('express');

const router = expres.Router();
const homeController = require('../controllers/homeController');

// Different routes
router.get('/', homeController.home);

module.exports = router;
