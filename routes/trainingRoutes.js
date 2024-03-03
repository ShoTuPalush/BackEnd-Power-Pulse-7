const express = require("express");
const ctrl = require("../controllers/trainingControllers");
const authMiddlewares = require("../middlewares/authMiddlewares");

const trainingRoutes = express.Router();

trainingRoutes.get("/", authMiddlewares, ctrl.getCategory);
trainingRoutes.get("/all", authMiddlewares, ctrl.getAll);

module.exports = trainingRoutes;
