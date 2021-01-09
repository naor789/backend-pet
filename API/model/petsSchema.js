const mongoose = require('mongoose');

const petsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    adoptionStatus: {
        type: String,
        required: true,
        min: 3
    },
    height: {
        type: Number,
        required: true,

    },
    weight: {
        type: Number,
        required: true,

    },
    color: {
        type: String,
        required: true,
        min: 3
    },
    bio: {
        type: String,
        required: true,
        min: 3
    },
    dietaryRestrictions: {
        type: String,
        required: true,
        min: 3
    },
    breed: {
        type: String,
        required: true,
        min: 3
    },
    type: {
        type: String,
        required: true,

    },
    hypoallergenic: {
        type: Boolean,
        required: true,
    },
    picture: {
        type: String,
        required: true,

    },
    date: {
        type: Date,
        default: Date.now
    },

});

module.exports = mongoose.model('Pet', petsSchema);