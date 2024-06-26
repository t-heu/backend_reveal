import express from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import { CreateCommentController } from '@/modules/feed/useCases/comments/createComment';
import { GetAllCommentsController } from '@/modules/feed/useCases/comments/getAllComments';

import ensureAuthenticated from '@/shared/infra/http/middlewares/ensureAuthenticated';
import cache from '@/shared/infra/http/middlewares/cacheable';

const commentRouter = express.Router();

commentRouter.get(
  '/posts/:id',
  cache(10),
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.QUERY]: {
      page: Joi.number().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  (req, res) => GetAllCommentsController.executeImpl(req, res),
);

commentRouter.post(
  '/posts/:id',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
      answer: Joi.string().required(),
    }),
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  (req, res) => CreateCommentController.executeImpl(req, res),
);

export default commentRouter;
