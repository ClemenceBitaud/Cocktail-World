const express = require('express');
const router = express.Router(); // router intégré au framework
const auth = require('../middlewares/auth');

const drinkCtrl = require('../controllers/drink');

router.get('/', [auth], drinkCtrl.getDrinks);
router.get('/:id', [auth], drinkCtrl.getDrink);
router.post('/', [auth], drinkCtrl.createDrink);
router.put('/:id', [auth], drinkCtrl.updateDrink);
router.delete('/:id', [auth], drinkCtrl.deleteDrink);
router.get('/search/:search', [auth],drinkCtrl.searchDrink);
router.get('/search/type/:id', [auth], drinkCtrl.searchByType)
router.get('/search/category/:id', [auth], drinkCtrl.searchByCategory)
module.exports = router;