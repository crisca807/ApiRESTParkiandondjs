const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10; // Número de rondas de sal para generar. Más rondas, más seguro pero más lento.

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    correoElectronico: {
        type: String,
        required: true,
        unique: true // Asegura que el correo electrónico sea único en la colección
    },
    contraseña: {
        type: String,
        required: true
    },
    tipoUsuario: {
        type: String,
        enum: ['administrador', 'cliente'],
        required: true
    }
});

// Middleware pre-save para encriptar la contraseña antes de guardar el usuario
userSchema.pre('save', function(next) {
    // `this` apunta al documento actual
    const user = this;

    // Solo encripta la contraseña si ha sido modificada (o es nueva)
    if (!user.isModified('contraseña')) return next();

    // Genera un salt y usa ese salt para encriptar la contraseña
    bcrypt.genSalt(saltRounds, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.contraseña, salt, function(err, hash) {
            if (err) return next(err);

            // Reemplaza la contraseña ingresada por la versión encriptada
            user.contraseña = hash;
            next();
        });
    });
});

module.exports = mongoose.model('User', userSchema);
