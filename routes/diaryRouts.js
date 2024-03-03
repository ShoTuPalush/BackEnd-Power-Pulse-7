const express = require("express");
const ctrl = require("../controllers/diaryControllers");

const diaryRoutes = express.Router();

diaryRoutes.post("/", ctrl.diaryUser);

module.exports = diaryRoutes;
