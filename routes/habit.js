const expres = require('express');

const router = expres.Router();
const habitController = require('../controllers/habitController');

router.get('/creation-form', habitController.creationForm);
router.post('/create', habitController.create);

router.get('/view/:id', habitController.detailedView);

router.post('/changeStatus', habitController.changeStatus);

module.exports = router;
