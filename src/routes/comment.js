const express = require("express");
const Comment = require("../models/comment"); // Asegúrate de que el path sea correcto

const router = express.Router();

// Crear comentario
router.post("/comments", (req, res) => {
    const newComment = new Comment(req.body); // Crear una nueva instancia del modelo Comment

    newComment
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

// Obtener todos los comentarios
router.get("/comments", (req, res) => {
    Comment.find() // Buscar todos los comentarios en la base de datos
        .then((data) => res.json(data)) // Enviar la lista de comentarios como respuesta
        .catch((error) => res.status(500).json({ message: error.message })); // Manejar errores
});

// Obtener un comentario por ID
router.get("/comments/:id", (req, res) => {
    const { id } = req.params;
    Comment.findById(id) // Buscar comentario por ID en la base de datos
        .then((comment) => {
            if (!comment) {
                return res.status(404).json({ message: 'Comment not found' }); // Si no se encuentra el comentario, devolver un error 404
            }
            res.json(comment); // Enviar el comentario encontrado como respuesta
        })
        .catch((error) => res.status(500).json({ message: error.message })); // Manejar errores
});

// Actualizar un comentario por ID
router.put("/comments/:id", (req, res) => {
    const { id } = req.params;
    const newData = req.body;

    Comment.findByIdAndUpdate(id, newData, { new: true }) // Buscar y actualizar el comentario por ID
        .then((comment) => {
            if (!comment) {
                return res.status(404).json({ message: 'Comment not found' }); // Si no se encuentra el comentario, devolver un error 404
            }
            res.json(comment); // Enviar el comentario actualizado como respuesta
        })
        .catch((error) => res.status(500).json({ message: error.message })); // Manejar errores
});

// Eliminar un comentario por ID
router.delete("/comments/:id", (req, res) => {
    const { id } = req.params;

    Comment.findByIdAndDelete(id) // Buscar y eliminar el comentario por ID
        .then(comment => {
            if (!comment) {
                return res.status(404).json({ message: 'Comment not found' }); // Si no se encuentra el comentario, devolver un error 404
            }
            res.status(200).json({ message: 'Comment deleted successfully' }); // Confirmar que el comentario ha sido eliminado
        })
        .catch(error => res.status(500).json({ message: error.message })); // Manejar errores
});

module.exports = router;
