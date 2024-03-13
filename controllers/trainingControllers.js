const controllerWrapper = require('../helpers/controllerWrapper');
const Filter = require('../models/filterts');
const Exercises = require('../models/exercises');

const getCategory = async (req, res) => {
  const result = await Filter.find();
  return res.json(result);
};

const getAll = async (req, res) => {
  const { page, limit } = req.query;
  const skip = (page - 1) * limit;
  const { bodyPart, equipment, target } = req.query;
  let filters = {};
  bodyPart && (filters.bodyPart = bodyPart);
  equipment && (filters.equipment = equipment);
  target && (filters.target = target);

  const maxPage = Math.ceil(
    (await Exercises.find(filters, ' ')).length / limit
  );
  const result = await Exercises.find(filters, ' ', { skip, limit }).exec();
  return res.json({ data: result, maxPage });
};

module.exports = {
  getCategory: controllerWrapper(getCategory),
  getAll: controllerWrapper(getAll),
};
