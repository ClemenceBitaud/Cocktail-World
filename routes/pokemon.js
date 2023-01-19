const express = require('express');
const router = express.Router(); // router intégré au framework
const auth = require('../middlewares/auth');

const pokemonCtrl = require('../controllers/pokemon');
const logger = require("../middlewares/logger");

router.get('/', [auth, logger], pokemonCtrl.getPokemons);
router.get('/:id', [auth, logger], pokemonCtrl.getPokemon);
router.post('/', [auth, logger], pokemonCtrl.createPokemon);
router.delete('/:id', [auth, logger], pokemonCtrl.deletePokemon);

module.exports = router;