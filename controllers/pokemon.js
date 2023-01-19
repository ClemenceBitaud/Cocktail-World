const Pokemon = require("../models/pokemon");
const {Schema} = require("mongoose");
const https = require('https')

exports.getPokemons = (req, res, next) => {

    Pokemon.find()
        .populate('drink')
        .exec((err, list) => {
            if (err){res.status(404).json({message: 'NOT FOUND', error: err})}
            res.status(200).json(list);
        })
}

exports.getPokemon = (req, res, next) => {

    Pokemon.findById(req.params.id)
        .populate('drink')
        .exec((err, d) => {
            if (err){res.status(404).json({message: 'NOT FOUND', error: err})}
            res.status(200).json(d);
        })
}

exports.createPokemon = (req, res, next) => {

    const url = `https://pokeapi.co/api/v2/pokemon/${req.body.idPokemon}`;
    https.get(url, resp => {
        let data = '';

        // Un morceau de réponse est reçu
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            const pokemonData = JSON.parse(data);

            const types = [];
            pokemonData.types.forEach(type => {
                types.push(type.type.name);
            })

            let pokemon = new Pokemon({
                name: pokemonData.name,
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData.id}.png`,
                types: types,
                description: req.body.description,
                drink: req.body.drink,
                creationDate: new Date(),
                modificationDate: new Date(),
                active: true
            });

            pokemon.save()
                .then((saved) => {
                    res.status(200).json(saved);
                })
                .catch((err) => res.status(500).json({message: 'Pb avec la création', error: err}));
        })
    }).on("error", (err) => {
        res.status(500).json({message: 'Pb avec la PokéApi', error: err})
    })
}

exports.deletePokemon = (req, res, next) => {

    Pokemon.findByIdAndDelete(req.params.id)
        .then((result) => {
            if (result){
                res.status(200).json(result)
            }else{
                res.status(500).json({message: 'ALREADY DELETED'})
            }
        })
        .catch((err) => {
            res.status(400).json({message: 'NOT FOUND', error: err})
        })
}