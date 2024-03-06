const userSchema = new mongoose.Schema({
    IDreserva: {
        type: String,
        required: true
    },
    tiempoReserva: {
        type: Date, // Tipo de dato para almacenar la fecha y hora
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
