const { Schema, model } = require('mongoose');

const dairySchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    date: {
      type: Date,
      required: true,
    },
    burnedCalories: {
      type: Number,
      default: 0,
    },
    consumedCalories: {
      type: Number,
      default: 0,
    },
    doneExercisesTime: {
      type: Number,
      default: 0,
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'product',
        },
        amount: {
          type: Number,
          default: 0,
        },
        calories: {
          type: Number,
          default: 0,
        },
      },
    ],
    exercises: [
      {
        exerciseId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'exercise',
        },
        time: {
          type: Number,
          default: 0,
        },
        calories: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

const Dairies = model('dairy', dairySchema);

module.exports = Dairies;
