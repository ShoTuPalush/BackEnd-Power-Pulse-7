const { Schema, model } = require('mongoose');

const usersSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      minLength: 6,
      required: [true, 'Set password for user'],
    },
    token: { type: String },
    avatarUrl: { type: String },
    height: {
      type: Number,
      default: 150,
      required: [true, 'Height is required'],
      min: [150, 'Height is more than 150'],
    },
    currentWeight: {
      type: Number,
      default: 60,
      required: [true, 'currentWeight is required'],
      min: [35, 'currentWeight is more than 35'],
    },
    desiredWeight: {
      type: Number,
      default: 60,
      required: [true, 'desiredWeight is required'],
      min: [35, 'desiredWeight is more than 35'],
    },
    birthday: {
      type: Date,
      validate: {
        validator: function (birthday) {
          const age = (new Date() - birthday) / (1000 * 60 * 60 * 24 * 365.25);
          return age >= 18;
        },
        message: 'The user must be over 18 years old.',
      },
      default: Date(25 / 10 / 1995),
      required: [true, 'birthday is required'],
    },
    blood: {
      type: Number,
      enum: [1, 2, 3, 4],
      default: 1,
      required: [true, 'blood is required'],
    },
    sex: {
      type: String,
      enum: ['male', 'female'],
      default: 'male',
      required: [true, 'sex is required'],
    },
    levelActivity: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      default: 1,
      required: [true, 'levelActivity is required'],
    },
    bmr: {
      type: Number,
      default: 2200,
      required: [true, 'bmr is required'],
    },
  },
  { versionKey: false, timestamps: true }
);

const Users = model('user', usersSchema);

module.exports = Users;
