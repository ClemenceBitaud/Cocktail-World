const express = require('express');
const router = express.Router(); // router intégré au framework

const recipeCtrl = require('../controllers/recipe');

router.get('/', recipeCtrl.getRecipes);
router.get('/:id', recipeCtrl.getRecipe);
router.post('/', recipeCtrl.createRecipe);
router.put('/:id', recipeCtrl.updateRecipe);
router.delete('/:id', recipeCtrl.deleteRecipe);

module.exports = router;