const express = require('express');
const ctrl = require('../controllers/usersControllers');
const validateBody = require('../helpers/validateBody');
const {
  bodyUserRegisterSchema,
  bodyUserLoginSchema,
  bodyUserUpdateSchema,
  bodyUserRefreshSchema,
  bodyUserValidateTwoSchema,
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

usersRouter.post('/logout', authMiddlewares, ctrl.logOutUser);

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

usersRouter.get('/verify/:verificationToken', ctrl.verifyUser);

usersRouter.post(
  '/verifyAgain',
  validateBody(bodyUserValidateTwoSchema),
  ctrl.verifyUserTwo
);

usersRouter.get('/googleAuth', ctrl.googleauth);

usersRouter.get('/googleredirect', ctrl.googleredirect);

module.exports = usersRouter;
