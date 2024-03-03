const express = require("express");
const ctrl = require("../controllers/usersControllers");

const usersRoutes = express.Router();

usersRoutes.get("/register", ctrl.registerUser);

module.exports = usersRoutes;
