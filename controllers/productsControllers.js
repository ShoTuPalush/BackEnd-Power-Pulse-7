const controllerWrapper = require("../helpers/controllerWrapper");
const Products = require("../models/products");
const ProductsCategories = require("../models/productsCategories");

const getCategory = async (req, res) => {
  const result = await ProductsCategories.find();
  return res.json(result);
};

const getAll = async (req, res) => {
  const { page, limit } = req.query;
  const skip = (page - 1) * limit;
  const { category, title, blood, recommended } = req.query;
  let filters = {};
  console.log(typeof blood);
  if (category) {
    filters.category = category;
  }
  if (title) {
    filters.title = { $regex: title, $options: "i" };
  }
  if (blood) {
    const bloodType = parseInt(blood);
    if (bloodType >= 1 && bloodType <= 4) {
      if (recommended) {
        filters[`groupBloodNotAllowed.${bloodType}`] =
          recommended.toLowerCase() !== "true";
      }
    }
  }
  const result = await Products.find(filters, " ", { skip, limit })
    .lean()
    .exec();
  return res.json(
    result.map((val) => {
      val.recommended = !val.groupBloodNotAllowed[blood];
      delete val.groupBloodNotAllowed;
      return val;
    })
  );
};

module.exports = {
  getCategory: controllerWrapper(getCategory),
  getAll: controllerWrapper(getAll),
};
