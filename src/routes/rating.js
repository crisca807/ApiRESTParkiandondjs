const express = require("express");
const Rating = require("../models/rating"); // Asegúrate de que el path sea correcto

const router = express.Router();

// Crear rating
router.post("/ratings", (req, res) => {
    const newRating = new Rating(req.body); // Crear una nueva instancia del modelo Rating

    newRating
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener todos los ratings
router.get("/ratings", (req, res) => {
    Rating.find() // Buscar todos los ratings en la base de datos
        .then((data) => res.json(data)) // Enviar la lista de ratings como respuesta
        .catch((error) => res.status(500).json({ message: error.message })); // Manejar errores
});

// Obtener un rating por ID
router.get("/ratings/:id", (req, res) => {
    const { id } = req.params;
    Rating.findById(id) // Buscar rating por ID en la base de datos
        .then((rating) => {
            if (!rating) {
                return res.status(404).json({ message: 'Rating not found' }); // Si no se encuentra el rating, devolver un error 404
            }
            res.json(rating); // Enviar el rating encontrado como respuesta
        })
        .catch((error) => res.status(500).json({ message: error.message })); // Manejar errores
});

// Actualizar un rating por ID
router.put("/ratings/:id", (req, res) => {
    const { id } = req.params;
    const newData = req.body;

    Rating.findByIdAndUpdate(id, newData, { new: true }) // Buscar y actualizar el rating por ID
        .then((rating) => {
            if (!rating) {
                return res.status(404).json({ message: 'Rating not found' }); // Si no se encuentra el rating, devolver un error 404
            }
            res.json(rating); // Enviar el rating actualizado como respuesta
        })
        .catch((error) => res.status(500).json({ message: error.message })); // Manejar errores
});

// Eliminar un rating por ID
router.delete("/ratings/:id", (req, res) => {
    const { id } = req.params;

    Rating.findByIdAndDelete(id) // Buscar y eliminar el rating por ID
        .then(rating => {
            if (!rating) {
                return res.status(404).json({ message: 'Rating not found' }); // Si no se encuentra el rating, devolver un error 404
            }
            res.status(200).json({ message: 'Rating deleted successfully' }); // Confirmar que el rating ha sido eliminado
        })
        .catch(error => res.status(500).json({ message: error.message })); // Manejar errores
});

module.exports = router;
