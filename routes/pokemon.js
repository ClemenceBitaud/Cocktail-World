const express = require('express');
const router = express.Router(); // router intégré au framework

const pokemonCtrl = require('../controllers/pokemon');

router.get('/', pokemonCtrl.getPokemons);
router.get('/:id', pokemonCtrl.getPokemon);
router.post('/', pokemonCtrl.createPokemon);
router.delete('/:id', pokemonCtrl.deletePokemon);

module.exports = router;