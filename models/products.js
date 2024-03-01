const { Schema, model } = require('mongoose');

const productsSchema = new Schema(
  {
    weight: {
      type: Number,
    },
    calories: {
      type: Number,
    },
    category: {
      type: String,
    },
    title: {
      type: String,
    },
    groupBloodNotAllowed: {
      type: Object,
    },
  },
  { versionKey: false, timestamps: true }
);

const Products = model('product', productsSchema);

module.exports = Products;
