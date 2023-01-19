const express = require('express');
const router = express.Router(); // router intégré au framework
const auth = require('../middlewares/auth');

const ingredientCtrl = require('../controllers/ingredient');
const logger = require("../middlewares/logger");

router.get('/', [auth, logger], ingredientCtrl.getIngredients);
router.get('/:id', [auth, logger], ingredientCtrl.getIngredient);
router.post('/', [auth, logger], ingredientCtrl.createIngredient);
router.put('/:id', [auth, logger], ingredientCtrl.updateIngredient);
router.delete('/:id', [auth, logger], ingredientCtrl.deleteIngredient);

module.exports = router;