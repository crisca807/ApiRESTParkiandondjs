const express = require("express");
const Establecimiento = require("../models/establishment"); // Asegúrate de que el path sea correcto

const router = express.Router();

// Crear establecimiento
router.post("/establishments", (req, res) => {
    const newEstablishment = new Establecimiento(req.body); // Crear una nueva instancia del modelo Establecimiento

    newEstablishment
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener todos los establecimientos
router.get("/establishments", (req, res) => {
    Establecimiento.find() // Buscar todos los establecimientos en la base de datos
        .then((data) => res.json(data)) // Enviar la lista de establecimientos como respuesta
        .catch((error) => res.status(500).json({ message: error.message })); // Manejar errores
});

// Obtener un establecimiento por ID
router.get("/establishments/:id", (req, res) => {
    const { id } = req.params;
    Establecimiento.findById(id) // Buscar establecimiento por ID en la base de datos
        .then((establishment) => {
            if (!establishment) {
                return res.status(404).json({ message: 'Establishment not found' }); // Si no se encuentra el establecimiento, devolver un error 404
            }
            res.json(establishment); // Enviar el establecimiento encontrado como respuesta
        })
        .catch((error) => res.status(500).json({ message: error.message })); // Manejar errores
});

// Actualizar un establecimiento por ID
router.put("/establishments/:id", (req, res) => {
    const { id } = req.params;
    const newData = req.body;

    Establecimiento.findByIdAndUpdate(id, newData, { new: true }) // Buscar y actualizar el establecimiento por ID
        .then((establishment) => {
            if (!establishment) {
                return res.status(404).json({ message: 'Establishment not found' }); // Si no se encuentra el establecimiento, devolver un error 404
            }
            res.json(establishment); // Enviar el establecimiento actualizado como respuesta
        })
        .catch((error) => res.status(500).json({ message: error.message })); // Manejar errores
});

// Eliminar un establecimiento por ID
router.delete("/establishments/:id", (req, res) => {
    const { id } = req.params;

    Establecimiento.findByIdAndDelete(id) // Buscar y eliminar el establecimiento por ID
        .then(establishment => {
            if (!establishment) {
                return res.status(404).json({ message: 'Establishment not found' }); // Si no se encuentra el establecimiento, devolver un error 404
            }
            res.status(200).json({ message: 'Establishment deleted successfully' }); // Confirmar que el establecimiento ha sido eliminado
        })
        .catch(error => res.status(500).json({ message: error.message })); // Manejar errores
});

module.exports = router;
