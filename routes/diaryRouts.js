const express = require("express");
const ctrl = require("../controllers/diaryControllers");
const authMiddlewares = require("../middlewares/authMiddlewares");
const validateBody = require("../helpers/validateBody");
const {
  productSchema,
  exerciseSchema,
  AlldayShema,
} = require("../schemas/productShema");

const diaryRoutes = express.Router();

diaryRoutes.post(
  "/addPoduct",
  authMiddlewares,
  validateBody(productSchema),
  ctrl.addDiaryProduct
);
diaryRoutes.post(
  "/addexercises",
  authMiddlewares,
  validateBody(exerciseSchema),
  ctrl.addDiaryExercisest
);
diaryRoutes.delete(
  "/deldiaryexercisest",
  authMiddlewares,
  validateBody(exerciseSchema),
  ctrl.delDiaryExercisest
);
diaryRoutes.post(
  "/alldaydiary",
  authMiddlewares,
  validateBody(AlldayShema),
  ctrl.getAlldiary
);

diaryRoutes.delete(
  "/deldiaryproduct",
  authMiddlewares,
  validateBody(productSchema),
  ctrl.delDiaryProduct
);
module.exports = diaryRoutes;
