const controllerWrapper = require("../helpers/controllerWrapper");
const Diaries = require("../models/diaries");

const diaryUser = async (req, res) => {
  res.json({ ok: true });
};

const addDiaryProduct = async (req, res) => {
  const { user } = req;
  const { date } = req.body;

  const userDiary = await Diaries.findOne({
    owner: user._id,
    date: new Date(date),
  });
  console.log(date);
  console.log(userDiary);

  if (!userDiary) {
    const creatUserDiary = await Diaries.create({ owner: user._id, date });
  }
  if (userDiary.date !== new Date(date)) {
    console.log(new Date(date));
    const creatUserDiary = await Diaries.create({
      owner: user._id,
      date,
    });
  }
  res.json({ ok: true });
};

module.exports = {
  diaryUser: controllerWrapper(diaryUser),
  addDiaryProduct: controllerWrapper(addDiaryProduct),
};
