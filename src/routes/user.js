const express = require("express");
const User = require("../models/user"); // Cambiar userSchema a User

const router = express.Router();



// create user
router.post("/users", (req, res) => {
    const newUser = new User(req.body); // Crear una nueva instancia del modelo User

    newUser
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});


router.get("/users", (req, res) => {
    User.find() // Buscar todos los datos en la base de datos
        .then((data) => res.json(data)) // Enviar la lista de datos como respuesta
        .catch((error) => res.status(500).json({ message: error.message })); // Manejar errores
});
//get a user by ID
router.get("/users/:id", (req, res) => {
    const { id } = req.params;
    User.findById(id) // Buscar usuario por ID en la base de datos
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' }); // Si no se encuentra el usuario, devolver un error 404
            }
            res.json(user); // Enviar el usuario encontrado como respuesta
        })
        .catch((error) => res.status(500).json({ message: error.message })); // Manejar errores
});

// Update a user by ID
router.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const newData = req.body;

    User.findByIdAndUpdate(id, newData, { new: true }) // Buscar y actualizar el usuario por ID
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' }); // Si no se encuentra el usuario, devolver un error 404
            }
            res.json(user); // Enviar el usuario actualizado como respuesta
        })
        .catch((error) => res.status(500).json({ message: error.message })); // Manejar errores
});


router.delete("/users/:id", (req, res) => {
    const { id } = req.params;

    User.findByIdAndDelete(id) // Buscar y eliminar el usuario por ID
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' }); // Si no se encuentra el usuario, devolver un error 404
            }
            res.status(200).json({ message: 'User deleted successfully' }); // Confirmar que el usuario ha sido eliminado
        })
        .catch(error => res.status(500).json({ message: error.message })); // Manejar errores
});





module.exports = router;
