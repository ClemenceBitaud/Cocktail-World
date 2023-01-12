const express = require('express');
const router = express.Router(); // router intégré au framework

const drinkCtrl = require('../controllers/drink');

router.get('/', drinkCtrl.getDrinks);
router.get('/:id', drinkCtrl.getDrink);
router.post('/', drinkCtrl.createDrink);
router.put('/:id', drinkCtrl.updateDrink);
router.delete('/:id', drinkCtrl.deleteDrink);

module.exports = router;