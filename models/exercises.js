const { Schema, model } = require('mongoose');

const exercisesSchema = new Schema(
  {
    bodyPart: {
      type: String,
    },
    equipment: {
      type: String,
    },
    gifUrl: {
      type: String,
    },
    name: {
      type: String,
    },
    target: {
      type: String,
    },
    burnedCalories: {
      type: Number,
    },
    time: {
      type: Number,
    },
  },
  { versionKey: false, timestamps: true }
);

const Exercises = model('exercise', exercisesSchema);

module.exports = Exercises;
