import express from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import { GetAllNotificationsController } from '../../../useCase/getAllNotifications';
import { CreateNotificationKeysController } from '../../../useCase/createNotificationKeys';
import { DeleteNotificationKeysController } from '../../../useCase/deleteNotificationKeys';
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
  (req, res) => CreateNotificationKeysController.executeImpl(req, res),
);

notificationRouter.get(
  '/delete/key',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  ensureAuthenticated,
  (req, res) => DeleteNotificationKeysController.executeImpl(req, res),
);

export default notificationRouter;
