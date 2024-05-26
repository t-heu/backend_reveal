import express from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import { GetAllNotificationsController } from '../../../useCase/getAllNotifications';
import { CreatePushTokenController } from '../../../useCase/createPushToken';
import { DeletePushTokenController } from '../../../useCase/deletePushToken';
import ensureAuthenticated from '../../../../../shared/infra/http/middlewares/ensureAuthenticated';

const notificationRouter = express.Router();

notificationRouter.get(
  '/',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  ensureAuthenticated,
  (req, res) => GetAllNotificationsController.executeImpl(req, res),
);

notificationRouter.get(
  '/create/key',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  ensureAuthenticated,
  (req, res) => CreatePushTokenController.executeImpl(req, res),
);

notificationRouter.get(
  '/delete/key',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  ensureAuthenticated,
  (req, res) => DeletePushTokenController.executeImpl(req, res),
);

export default notificationRouter;
