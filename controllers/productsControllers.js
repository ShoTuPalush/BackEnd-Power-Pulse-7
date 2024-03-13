const controllerWrapper = require('../helpers/controllerWrapper');
const Products = require('../models/products');
const ProductsCategories = require('../models/productsCategories');

const getCategory = async (req, res) => {
  const result = await ProductsCategories.find().sort({ title: 1 });
  return res.json(result);
};

const getAll = async (req, res) => {
  const { page, limit } = req.query;
  const skip = (page - 1) * limit;
  const { category, title, blood, recommended } = req.query;
  let filters = {};
  category && (filters.category = category);
  title && (filters.title = { $regex: title, $options: 'i' });
  if (blood) {
    const bloodType = parseInt(blood);
    if (bloodType >= 1 && bloodType <= 4) {
      if (recommended) {
        filters[`groupBloodNotAllowed.${bloodType}`] =
          recommended.toLowerCase() === 'true';
      }
      if (!recommended && recommended !== undefined) {
        filters[`groupBloodNotAllowed.${bloodType}`] =
          recommended.toLowerCase() === 'false';
      }
    }
  }
  const maxPage = Math.ceil((await Products.find(filters, ' ')).length / limit);
  const result = await Products.find(filters, ' ', { skip, limit })
    .lean()
    .exec();
  return res.json({
    data: result.map(val => {
      val.recommended = val.groupBloodNotAllowed[blood];
      delete val.groupBloodNotAllowed;
      return val;
    }),
    maxPage,
  });
};

module.exports = {
  getCategory: controllerWrapper(getCategory),
  getAll: controllerWrapper(getAll),
};
