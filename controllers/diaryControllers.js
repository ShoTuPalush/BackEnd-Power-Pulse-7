const controllerWrapper = require("../helpers/controllerWrapper");

const diaryUser = async (req, res) => {
  res.json({ ok: true });
};

module.exports = {
  diaryUser: controllerWrapper(diaryUser),
};
