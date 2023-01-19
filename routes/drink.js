const express = require('express');
const router = express.Router(); // router intégré au framework
const auth = require('../middlewares/auth');
const logger = require('../middlewares/logger');

const drinkCtrl = require('../controllers/drink');

router.get('/', [auth, logger], drinkCtrl.getDrinks);
router.get('/:id', [auth, logger], drinkCtrl.getDrink);
router.post('/', [auth, logger], drinkCtrl.createDrink);
router.put('/:id', [auth, logger], drinkCtrl.updateDrink);
router.delete('/:id', [auth, logger], drinkCtrl.deleteDrink);
router.get('/search/:search', [auth, logger],drinkCtrl.searchDrink);
router.get('/search/type/:id', [auth, logger], drinkCtrl.searchByType);
router.get('/search/category/:id', [auth, logger], drinkCtrl.searchByCategory);
router.get('/random/find', [auth, logger], drinkCtrl.randomDrink);
module.exports = router;