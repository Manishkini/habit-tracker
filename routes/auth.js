const expres = require('express');

const router = expres.Router();
const authController = require('../controllers/authController');

router.get('/sign-in', authController.signIn);
router.get('/sign-up', authController.signUp);

module.exports = router;
