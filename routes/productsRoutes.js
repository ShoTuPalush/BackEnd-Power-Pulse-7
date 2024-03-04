const express = require("express");
const ctrl = require("../controllers/productsControllers");
const authMiddlewares = require("../middlewares/authMiddlewares");

const productsRoutes = express.Router();

productsRoutes.get("/", authMiddlewares, ctrl.getCategory);
productsRoutes.get("/all", ctrl.getAll);

module.exports = productsRoutes;
