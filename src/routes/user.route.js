const express = require("express");
const { Router } = require('express');
const userRoutes = Router();

// Controllers para definir as rotas
const UserController = require("../controllers/user.controller");
// Rotas
userRoutes.post("/user/login", UserController.userLogin)
userRoutes.get("/user/list", UserController.listUsers);
userRoutes.post("/user/cadastro", UserController.insertUser);
userRoutes.get("/userfind", UserController.listOneUser)
userRoutes.patch("/user/update/:id", UserController.userUpdate)
userRoutes.delete("/userdelete/:id", UserController.userDelete);


module.exports = userRoutes;
