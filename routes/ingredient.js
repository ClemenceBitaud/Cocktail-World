const express = require('express');
const router = express.Router(); // router intégré au framework
const auth = require('../middlewares/auth');

const ingredientCtrl = require('../controllers/ingredient');

router.get('/', [auth], ingredientCtrl.getIngredients);
router.get('/:id', [auth], ingredientCtrl.getIngredient);
router.post('/', [auth], ingredientCtrl.createIngredient);
router.put('/:id', [auth], ingredientCtrl.updateIngredient);
router.delete('/:id', [auth], ingredientCtrl.deleteIngredient);

module.exports = router;