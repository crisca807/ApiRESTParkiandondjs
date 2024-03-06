const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    IDcalificacion: {
        type: String,
        required: true
    },
    Valoracion: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    IDusuario: {
        type: String,
        required: true
    },
    IDEstablecimiento: {
        type: Number,
        required: true
    }
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
