const HttpError = require('../helpers/HttpError');
const controllerWrapper = require('../helpers/controllerWrapper');

const registerUser = async (req, res) => {
  res.json({ ok: true });
};

module.exports = controllerWrapper(registerUser);
