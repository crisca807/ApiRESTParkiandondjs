const mongoose = require('mongoose');

const establishmentSchema = new mongoose.Schema({
    IDEstablecimiento: {
        type: String,
        required: true
    },
    NombreEstablecimiento: {
        type: String,
        required: true
    },
    Capacidad: {
        type: Number,
        required: true
    },
    Tarifa: {
        type: Number,
        required: true
    }
});

const Establecimiento = mongoose.model('Establecimiento', establishmentSchema);

module.exports = Establecimiento;
