const mongoose = require('mongoose');

const stepSchema = mongoose.Schema({
    name: {type: String, required: true},
    text: {type: String, required: true},
    creationDate: {type: Date, required: false},
    modificationDate: {type: Date, required: false},
    active: {type: Boolean, required: false}
});

module.exports = mongoose.model('Step', stepSchema);