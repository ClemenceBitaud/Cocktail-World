const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const drinkSchema = mongoose.Schema({
    name: {type: String, required: true},
    type: { type: Schema.Types.ObjectId, ref: 'Type' },
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category'}],
    ingredients: [{ type: Schema.Types.ObjectId, ref: 'Ingredient'}],
    recipe: {type: String, required: true},
    image: {type: String, required: false},
    creationDate: {type: Date, required: false},
    modificationDate: {type: Date, required: false},
    active: {type: Boolean, required: false}
});

module.exports = mongoose.model('Drink', drinkSchema);