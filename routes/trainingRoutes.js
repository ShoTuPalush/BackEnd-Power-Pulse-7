const express = require("express");
const ctrl = require("../controllers/trainingControllers");
const authMiddlewares = require("../middlewares/authMiddlewares");

const trainingRoutes = express.Router();

trainingRoutes.get("/", ctrl.getCategory);
trainingRoutes.get("/all", ctrl.getAll);

module.exports = trainingRoutes;
