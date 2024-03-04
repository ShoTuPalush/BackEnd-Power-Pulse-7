const controllerWrapper = require("../helpers/controllerWrapper");
const Filter = require("../models/filterts");
const Exercises = require("../models/exercises");

const getCategory = async (req, res) => {
  const result = await Filter.find();
  return res.json(result);
};

const getAll = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const { bodyPart, equipment, target } = req.query;
  let filters = {};
  if (bodyPart) {
    filters.bodyPart = bodyPart;
  }
  if (equipment) {
    filters.equipment = equipment;
  }
  if (target) {
    filters.target = target;
  }
  const result = await Exercises.find(filters, " ", { skip, limit }).exec();
  return res.json(result);
};

module.exports = {
  getCategory: controllerWrapper(getCategory),
  getAll: controllerWrapper(getAll),
};
