const { Schema, model } = require('mongoose');

const tokenSchema = new Schema(
  {
    tokenId: String,
    userId: String,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Tokens = model('token', tokenSchema);

module.exports = Tokens;
