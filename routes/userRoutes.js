const express = require('express');
const controllerWrapper = require('../helpers/controllerWrapper');
const registerUser = require('../controllers/usersControllers');

const usersRoutes = express.Router();

usersRoutes.get('/register', registerUser);

module.exports = usersRoutes;
