const controllerWrapper = require('../helpers/controllerWrapper');
const Exercises = require('../models/exercises');
const Diaries = require('../models/diaries');
const Users = require('../models/users');

const getStatistics = async (req, res) => {
  try {
    const allExercisesVideo = await Exercises.countDocuments({ gifUrl: { $gt: '' } });
    const allBurnedCaloriesArray = await Diaries.find({ burnedCalories: { $gt: 0 } }, { burnedCalories: 1, _id: 0 });
    const allBurnedCalories = allBurnedCaloriesArray.map(item => item.burnedCalories).reduce((sum, elem) => sum + elem, 0);
    const allUsers = await Users.countDocuments();
    const allDoneExercisesTimeArray = await Diaries.find({ doneExercisesTime: { $gt: 0 } }, { doneExercisesTime: 1, _id: 0 });
    const allDoneExercisesTime = allDoneExercisesTimeArray.map(item => item.doneExercisesTime).reduce((sum, elem) => sum + elem, 0);
    const allDoneEcerxisesArray = await Diaries.find({ exercises: { $gt: [] } }, { exercises: 1, _id: 0 });
    const allDoneExercises = allDoneEcerxisesArray.map(item => item.exercises).reduce((sum, elem) => sum + elem.length, 0);

    res.json({
      allExercisesVideo,
      allBurnedCalories,
      allUsers,
      allDoneExercisesTime,
      allDoneExercises,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getStatistics: controllerWrapper(getStatistics),
};