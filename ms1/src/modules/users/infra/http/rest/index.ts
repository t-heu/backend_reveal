import express from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';

import { CreateUserController } from '@/modules/users/useCases/createUser';
import { ChangePasswordController } from '@/modules/users/useCases/changePassword';
import { UpdateUserNameController } from '@/modules/users/useCases/updateUserName';
import { AuthenticateUserController } from '@/modules/users/useCases/authenticateUser';
import { RegisterWithGoogleController } from '@/modules/users/useCases/registerWithGoogle';
import { UpdateUserAvatarController } from '@/modules/users/useCases/updateUserAvatar';
import { ResetPasswordController } from '@/modules/users/useCases/resetPassword';
import { ForgotPasswordEmailController } from '@/modules/users/useCases/forgotPasswordEmail';
import { GetCurrentUserUserController } from '@/modules/users/useCases/getCurrentUser';
import { RefreshAccessTokenController } from '@/modules/users/useCases/refreshAccessToken';
import { VerifyEmailController } from '@/modules/users/useCases/verifyEmail';

import cache from '@/shared/infra/http/middlewares/cacheable';
import ensureAuthenticated from '@/shared/infra/http/middlewares/ensureAuthenticated';
import multerConfig from '@/config/upload';

const userRouter = express.Router();
const upload = multer(multerConfig.multer).single('photo');

userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    }),
  }),
  (req, res) => CreateUserController.executeImpl(req, res),
);

userRouter.get(
  '/me',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  ensureAuthenticated,
  (req, res) => GetCurrentUserUserController.executeImpl(req, res),
);

userRouter.post(
  '/session',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(3).required(),
      locale: Joi.string(),
      notification_key: Joi.string(),
    }),
  }),
  (req, res) => AuthenticateUserController.executeImpl(req, res),
);

userRouter.post(
  '/token/refresh',
  celebrate({
    [Segments.QUERY]: {
      grant_type: Joi.string().required(),
      refresh_token: Joi.string().required(),
    },
  }),
  cache(5),
  (req, res) => RefreshAccessTokenController.executeImpl(req, res),
);

userRouter.post(
  '/confirm/email',
  celebrate({
    [Segments.QUERY]: {
      token: Joi.string().required(),
    },
  }),
  (req, res) => VerifyEmailController.executeImpl(req, res),
);

userRouter.post(
  '/account/google',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      accessTokenGoogle: Joi.string().required(),
    }),
  }),
  (req, res) => RegisterWithGoogleController.executeImpl(req, res),
);

userRouter.patch(
  '/name',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().min(3).required(),
    }),
  }),
  ensureAuthenticated,
  (req, res) => UpdateUserNameController.executeImpl(req, res),
);

userRouter.post(
  '/password/forgot',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
    }),
  }),
  (req, res) => ForgotPasswordEmailController.executeImpl(req, res),
);

userRouter.post(
  '/password/reset',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      password: Joi.string().min(3).required(),
    }),
    [Segments.QUERY]: {
      token: Joi.string().required(),
    },
  }),
  (req, res) => ResetPasswordController.executeImpl(req, res),
);

userRouter.put(
  '/password/change',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
      newPassword: Joi.string().min(3).required(),
      oldPassword: Joi.string().min(3).required(),
    }),
  }),
  ensureAuthenticated,
  (req, res) => ChangePasswordController.executeImpl(req, res),
);

userRouter.patch(
  '/avatar',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.QUERY]: {
      filename: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  upload,
  (req, res) => UpdateUserAvatarController.executeImpl(req, res),
);

export default userRouter;
