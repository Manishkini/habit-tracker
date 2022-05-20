const expres = require('express');

const router = expres.Router();
const userController = require('../controllers/userController');

router.post('/create', userController.create);
router.post('/createSession', userController.createSession);
router.get('/endSession', userController.endSession);

module.exports = router;
