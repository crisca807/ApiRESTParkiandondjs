require("dotenv").config(); // Cargar las variables de entorno desde el archivo .env

const express = require('express');
const mongoose = require('mongoose');
const  userRoutes = require("./routes/user")
const  reserveRoutes = require("./routes/reserve")
const  EstablishmentRoutes = require("./routes/establishment")
const  RatingRoutes = require("./routes/rating")
const commentRoutes = require("./routes/comment")

const app = express();
const port = process.env.PORT || 9000;

//middleware
app.use(express.json())
app.use('/api', userRoutes);
app.use('/api', reserveRoutes);
app.use('/api', EstablishmentRoutes);
app.use('/api', RatingRoutes);
app.use('/api', commentRoutes);

app.get("/", (req, res) => {
    res.send('Welcome to my API');
});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((error) => console.error("Error connecting to MongoDB:", error));

app.listen(port, () => {
    console.log('Server listening on port', port);
});



