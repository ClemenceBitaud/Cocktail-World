const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const recipeSchema = mongoose.Schema({
    name: {type: String, required: true},
    steps: [{ type: Schema.Types.ObjectId, ref: 'Step' }],
    creationDate: {type: Date, required: false},
    modificationDate: {type: Date, required: false},
    active: {type: Boolean, required: false}
});

module.exports = mongoose.model('Recipe', recipeSchema);