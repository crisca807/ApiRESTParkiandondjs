const express = require("express");
const Reservation = require("../models/reserve"); // Asegúrate de que el path sea correcto

const router = express.Router();

// Crear reserva
router.post("/reserves", (req, res) => {
    const newReservation = new Reservation(req.body); // Crear una nueva instancia del modelo Reservation

    newReservation
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener todas las reservas
router.get("/reserves", (req, res) => {
    Reservation.find() // Buscar todas las reservas en la base de datos
        .then((data) => res.json(data)) // Enviar la lista de reservas como respuesta
        .catch((error) => res.status(500).json({ message: error.message })); // Manejar errores
});

// Obtener una reserva por ID
router.get("/reserves/:id", (req, res) => {
    const { id } = req.params;
    Reservation.findById(id) // Buscar reserva por ID en la base de datos
        .then((reservation) => {
            if (!reservation) {
                return res.status(404).json({ message: 'Reservation not found' }); // Si no se encuentra la reserva, devolver un error 404
            }
            res.json(reservation); // Enviar la reserva encontrada como respuesta
        })
        .catch((error) => res.status(500).json({ message: error.message })); // Manejar errores
});

// Actualizar una reserva por ID
router.put("/reserves/:id", (req, res) => {
    const { id } = req.params;
    const newData = req.body;

    Reservation.findByIdAndUpdate(id, newData, { new: true }) // Buscar y actualizar la reserva por ID
        .then((reservation) => {
            if (!reservation) {
                return res.status(404).json({ message: 'Reservation not found' }); // Si no se encuentra la reserva, devolver un error 404
            }
            res.json(reservation); // Enviar la reserva actualizada como respuesta
        })
        .catch((error) => res.status(500).json({ message: error.message })); // Manejar errores
});

// Eliminar una reserva por ID
router.delete("/reserves/:id", (req, res) => {
    const { id } = req.params;

    Reservation.findByIdAndDelete(id) // Buscar y eliminar la reserva por ID
        .then(reservation => {
            if (!reservation) {
                return res.status(404).json({ message: 'Reservation not found' }); // Si no se encuentra la reserva, devolver un error 404
            }
            res.status(200).json({ message: 'Reservation deleted successfully' }); // Confirmar que la reserva ha sido eliminada
        })
        .catch(error => res.status(500).json({ message: error.message })); // Manejar errores
});


module.exports = router;
