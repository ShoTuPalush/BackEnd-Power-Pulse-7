const express = require('express');
const controllerWrapper = require('../helpers/controllerWrapper');
const ctrl = require('../controllers/usersControllers');

const usersRoutes = express.Router();

usersRoutes.get('/register', ctrl.registerUser);

module.exports = usersRoutes;
