const express = require('express');
const router = express.Router(); // router intégré au framework

const ingredientCtrl = require('../controllers/ingredient');

router.get('/', ingredientCtrl.getIngredients);
router.get('/:id', ingredientCtrl.getIngredient);
router.post('/', ingredientCtrl.createIngredient);
router.put('/:id', ingredientCtrl.updateIngredient);
router.delete('/:id', ingredientCtrl.deleteIngredient);

module.exports = router;