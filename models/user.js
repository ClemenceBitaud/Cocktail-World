const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const userSchema = mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    favorites : [{ type: Schema.Types.ObjectId, ref: 'Drink' }],
    creationDate: {type: Date, required: false},
    modificationDate: {type: Date, required: false},
    active: {type: Boolean, required: false}
});

module.exports = mongoose.model('User', userSchema);