const express = require('express');
const ctrl = require('../controllers/usersControllers');
const validateBody = require('../helpers/validateBody');
const {
  bodyUserRegisterSchema,
  bodyUserLoginSchema,
  bodyUserUpdateSchema,
  bodyUserRefreshSchema,
} = require('../schemas/usersSchema');
const authMiddlewares = require('../middlewares/authMiddlewares');
const upload = require('../middlewares/updateAvatarMiddlewares');

const usersRouter = express.Router();

usersRouter.post(
  '/register',
  validateBody(bodyUserRegisterSchema),
  ctrl.registerUser
);

usersRouter.post('/login', validateBody(bodyUserLoginSchema), ctrl.loginUser);

usersRouter.get('/logout', authMiddlewares, ctrl.logOutUser);

usersRouter.get('/current', authMiddlewares, ctrl.currentUser);

usersRouter.put(
  '/update',
  authMiddlewares,
  validateBody(bodyUserUpdateSchema),
  ctrl.updateUser
);

usersRouter.patch(
  '/updateAvatar',
  authMiddlewares,
  upload.single('avatar'),
  ctrl.updateAvatar
);

usersRouter.post(
  '/refresh',
  validateBody(bodyUserRefreshSchema),
  ctrl.refreshToken
);

module.exports = usersRouter;
