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
    },
    weight: {
        type: Number,
    },
    color: {
        type: String,
        min: 3
    },
    bio: {
        type: String,
        min: 3
    },
    dietaryRestrictions: {
        type: String,
        min: 3
    },
    breed: {
        type: String,
        min: 3
    },
    type: {
        type: String,

    },
    hypoallergenic: {
        type: Boolean,
    },
    // picture: {
    //     // type: String,

    //     data: Buffer,
    //     contentType: String
    // },
    date: {
        type: Date,
        default: Date.now
    },

});

module.exports = mongoose.model('Pet', petsSchema);