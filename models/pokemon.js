const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const pokemonSchema = mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    types: {type: [String], required: true},
    description: {type: String, required: true},
    drink: { type: Schema.Types.ObjectId, ref: 'Drink' },
    creationDate: {type: Date, required: false},
    modificationDate: {type: Date, required: false},
    active: {type: Boolean, required: false}
});

module.exports = mongoose.model('Pokemon', pokemonSchema);