const express = require("express");
const ctrl = require("../controllers/diaryControllers");
const authMiddlewares = require("../middlewares/authMiddlewares");

const diaryRoutes = express.Router();

diaryRoutes.post("/", ctrl.diaryUser);
diaryRoutes.post("/addPoduct", authMiddlewares, ctrl.addDiaryProduct);
module.exports = diaryRoutes;
