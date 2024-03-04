const controllerWrapper = require("../helpers/controllerWrapper");
const Products = require("../models/products");
const ProductsCategories = require("../models/productsCategories");

const getCategory = async (req, res) => {
  const result = await ProductsCategories.find();
  return res.json(result);
};

const getAll = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const { category, title, blood, recomended } = req.query;
  let filters = {};
  if (category) {
    filters.category = category;
  }
  if (title) {
    filters.title = { $regex: title, $options: "i" };
  }
  if (blood) {
    const bloodType = parseInt(blood);
    if (bloodType >= 1 && bloodType <= 4) {
      if (recomended) {
        filters[`groupBloodNotAllowed.${bloodType}`] =
          recomended.toLowerCase() === "true";
      }
    }
  }
  const result = await Products.find(filters, " ", { skip, limit }).exec();
  return res.json(result);
};

module.exports = {
  getCategory: controllerWrapper(getCategory),
  getAll: controllerWrapper(getAll),
};
