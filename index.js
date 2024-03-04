const express = require("express");
const cors = require("cors")
const app = express();

app.use(express.urlencoded({extended: true,}),);
app.use(express.json());
app.use(cors());

// Routes
const userRoutes = require("./src/routes/user.route");
const animeRoutes = require("./src/routes/anime.route");


app.use(userRoutes, animeRoutes);
const Loaders = require("./loaders");
Loaders.start();

// okami-anime
app.listen(3333);
console.log("Servidor rodando na porta 3333");