const controllerWrapper = require('../helpers/controllerWrapper');
const Diaries = require('../models/diaries');
const Exercises = require('../models/exercises');
const Products = require('../models/products');
const { format } = require('date-fns');

const checkUser = async (user, date) => {
  const newDates = format(new Date().setTime(date), 'MM/dd/yyyy');
  const newDate = new Date(newDates).setHours(2);
  let foundedDiary;
  const userDiary = await Diaries.findOne({
    owner: user._id,
    date: newDate,
  });
  foundedDiary = userDiary?._id;
  if (!userDiary) {
    const creatUserDiary = await Diaries.create({
      owner: user._id,
      date: newDate,
    });
    foundedDiary = creatUserDiary?._id;
  }
  return foundedDiary;
};

const addDiaryProduct = async (req, res) => {
  const { user } = req;
  const { date, productId, calories, amount } = req.body;
  const foundedDiary = await checkUser(user, date);
  const data = await Diaries.findByIdAndUpdate(
    foundedDiary,
    {
      $inc: { consumedCalories: +calories },
      $push: { products: { productId, amount, calories } },
    },
    { new: true }
  )
    .populate(
      'exercises.exerciseId',
      'equipment bodyPart gifUrl name target burnedCalories time'
    )
    .populate(
      'products.productId',
      'category weight calories title groupBloodNotAllowed'
    );
  res.json({ data });
};
//=============== Додаємо вправи
const addDiaryExercisest = async (req, res) => {
  const { user } = req;
  const { date, exerciseId, calories, time } = req.body;
  const foundedDiary = await checkUser(user, date);
  const data = await Diaries.findByIdAndUpdate(
    foundedDiary,
    {
      $inc: { burnedCalories: +calories, doneExercisesTime: +time },
      $push: { exercises: { exerciseId, time, calories } },
    },
    { new: true }
  )
    .populate(
      'exercises.exerciseId',
      'equipment bodyPart gifUrl name target burnedCalories time'
    )
    .populate(
      'products.productId',
      'category weight calories title groupBloodNotAllowed'
    );
  res.json({ data });
};
//Видаляємо вправи
const delDiaryExercisest = async (req, res) => {
  const { user } = req;
  const { date, exerciseId, calories, time } = req.body;
  const foundedDiary = await checkUser(user, date);

  const data = await Diaries.findByIdAndUpdate(
    foundedDiary,
    {
      $inc: { burnedCalories: -calories, doneExercisesTime: -time },
      $pull: { exercises: { _id: exerciseId } },
    },
    { new: true, fields: { exercises: 0, products: 0 } }
  )
    .populate(
      'exercises.exerciseId',
      'equipment bodyPart gifUrl name target burnedCalories time'
    )
    .populate(
      'products.productId',
      'category weight calories title groupBloodNotAllowed'
    );
  res.json({ data, exercises: exerciseId });
};
//Видаляємо продукт
const delDiaryProduct = async (req, res) => {
  const { user } = req;
  const { date, productId, calories } = req.body;
  const foundedDiary = await checkUser(user, date);

  const data = await Diaries.findByIdAndUpdate(
    foundedDiary,
    {
      $inc: { consumedCalories: -calories },
      $pull: { products: { _id: productId } },
    },
    { new: true, fields: { exercises: 0, products: 0 } }
  )
    .populate(
      'exercises.exerciseId',
      'equipment bodyPart gifUrl name target burnedCalories time'
    )
    .populate(
      'products.productId',
      'category weight calories title groupBloodNotAllowed'
    );

  res.json({ data, products: productId });
};
//Відправляємо на FRONT-END усі прави користувача та продукти
const getAlldiary = async (req, res) => {
  const { user } = req;
  const { date } = req.query;
  const foundedDiary = await checkUser(user, date);

  const data = await Diaries.findById(foundedDiary)
    .populate(
      'exercises.exerciseId',
      'equipment bodyPart gifUrl name target burnedCalories time'
    )
    .populate(
      'products.productId',
      'category weight calories title groupBloodNotAllowed'
    );
  res.json({ data });
};
module.exports = {
  addDiaryProduct: controllerWrapper(addDiaryProduct),
  addDiaryExercisest: controllerWrapper(addDiaryExercisest),
  delDiaryExercisest: controllerWrapper(delDiaryExercisest),
  delDiaryProduct: controllerWrapper(delDiaryProduct),
  getAlldiary: controllerWrapper(getAlldiary),
};
