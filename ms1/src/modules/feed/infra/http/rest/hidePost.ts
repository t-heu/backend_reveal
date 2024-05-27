import express from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import { SwitchHidePostController } from '@/modules/feed/useCases/post/switchHidePost';
import ensureAuthenticated from '@/shared/infra/http/middlewares/ensureAuthenticated';

const hidePostRouter = express.Router();

hidePostRouter.post(
  '/:id',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  (req, res) => SwitchHidePostController.executeImpl(req, res),
);

export default hidePostRouter;
