const controllerWrapper = require("../helpers/controllerWrapper");
const Filter = require("../models/filterts");
const Exercises = require("../models/exercises");

const getCategory = async (req, res) => {
  const result = await Filter.find();
  return res.json(result);
};

const getAll = async (req, res) => {
  const result = await Exercises.find();
  return res.json(result);
};

module.exports = {
  getCategory: controllerWrapper(getCategory),
  getAll: controllerWrapper(getAll),
};
