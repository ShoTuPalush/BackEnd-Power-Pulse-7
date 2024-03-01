const { Schema, model } = require('mongoose');

const productsCategoriesSchema = new Schema(
  {
    title: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const ProductsCategories = model(
  'products-categorie',
  productsCategoriesSchema
);

module.exports = ProductsCategories;
