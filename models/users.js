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
      min: [150, 'Height is more than 150'],
    },
    currentWeight: {
      type: Number,
      min: [35, 'currentWeight is more than 35'],
    },
    desiredWeight: {
      type: Number,
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
    },
    blood: {
      type: Number,
      enum: [1, 2, 3, 4],
    },
    sex: {
      type: String,
      enum: ['male', 'female'],
    },
    levelActivity: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
    },
    bmr: {
      type: Number,
    },
    timeSport: {
      type: Number,
      default: 110,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
    verify: { type: Boolean, default: false },
  },
  { versionKey: false, timestamps: true }
);

const Users = model('user', usersSchema);

module.exports = Users;
