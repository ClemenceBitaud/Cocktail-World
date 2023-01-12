const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const drinkSchema = mongoose.Schema({
    name: {type: String, required: true},
    type: {type: Schema.Types.ObjectId, required: true},
    categories: {type: [Schema.Types.ObjectId], required: true},
    ingredients: {type: [Schema.Types.ObjectId], required: true},
    recipe: {type: Schema.Types.ObjectId, required: true},
    creationDate: {type: Date, required: false},
    modificationDate: {type: Date, required: false},
    active: {type: Boolean, required: false}
});

module.exports = mongoose.model('Drink', drinkSchema);