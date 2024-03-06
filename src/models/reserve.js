const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    IDreserva: {
        type: String,
        required: true
    },
    tiempoReserva: {
        type: Date,
        required: true
    },
    placa: {
        type: String,
        required: true
    },
    tipoVehiculo: {
        type: String,
        enum: ['moto', 'carro'],
        required: true
    }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
