const controllerWrapper = require('../helpers/controllerWrapper.js');

const registerUser = async (req, res) => {
  res.json({ ok: true });
};

module.exports = { registerUser: controllerWrapper(registerUser) };
