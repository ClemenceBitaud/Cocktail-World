const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const ingredientSchema = mongoose.Schema({
    name: {type: String, required: true},
    quantity: {type: Number, required: true},
    unit: {type: String, required: true},
    creationDate: {type: Date, required: false},
    modificationDate: {type: Date, required: false},
    active: {type: Boolean, required: false}
});

module.exports = mongoose.model('Ingredient', ingredientSchema);