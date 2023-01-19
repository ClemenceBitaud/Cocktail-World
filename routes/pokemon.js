const express = require('express');
const router = express.Router(); // router intégré au framework
const auth = require('../middlewares/auth');

const pokemonCtrl = require('../controllers/pokemon');

router.get('/', [auth], pokemonCtrl.getPokemons);
router.get('/:id', [auth], pokemonCtrl.getPokemon);
router.post('/', [auth], pokemonCtrl.createPokemon);
router.delete('/:id', [auth], pokemonCtrl.deletePokemon);

module.exports = router;