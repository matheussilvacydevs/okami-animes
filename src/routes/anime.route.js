const express = require("express");
const {Router} = require('express');
const animeRoutes = Router();    

// Controler das rotas de animes
const AnimeController = require("../controllers/anime.controller");

animeRoutes.get("/anime/list", AnimeController.listAnimes);
animeRoutes.post("/anime/cadastro", AnimeController.insertAnime);
animeRoutes.get("/animefind/:id", AnimeController.listOneAnime)
animeRoutes.patch("/anime/update/:id", AnimeController.animeUpdate)
animeRoutes.delete("/animedelete/:id", AnimeController.animeDelete);


module.exports = animeRoutes;
