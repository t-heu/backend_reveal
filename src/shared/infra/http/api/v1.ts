import express from 'express';

import userRouter from '../../../../modules/users/infra/http/routes';
import postRouter from '../../../../modules/feed/infra/http/routes/post';
import hidePostRouter from '../../../../modules/feed/infra/http/routes/hidePost';
import likeRouter from '../../../../modules/feed/infra/http/routes/likes';
import commentRouter from '../../../../modules/feed/infra/http/routes/comments';
import notificationRouter from '../../../../modules/notification/infra/http/routes';

const v1Router = express.Router();

v1Router.use('/users', userRouter);
v1Router.use('/posts', postRouter);
v1Router.use('/posts/likes', likeRouter);
v1Router.use('/posts/hides', hidePostRouter);
v1Router.use('/comments', commentRouter);
v1Router.use('/notifications', notificationRouter);

export default v1Router;
