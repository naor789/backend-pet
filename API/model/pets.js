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
        type: String,
    },
    weight: {
        type: String,
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
    picture: {
        type: File,
    },
    date: {
        type: Date,
        default: Date.now
    },

});

module.exports = mongoose.model('pets', petsSchema);