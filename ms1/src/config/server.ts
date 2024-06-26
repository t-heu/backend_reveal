import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import morganBody from 'morgan-body';
import path from 'path';
import 'express-async-errors';
import { errors } from 'celebrate';
import multer from 'multer';
import { Server } from 'http';
import { container } from 'tsyringe';

import { WebSocketHandler } from '@/shared/infra/ws/webSocketHandler';
import v1Router from '@/shared/infra/http/api/v1';
import rateLimiter from '@/shared/infra/http/middlewares/rateLimiter';
import { log } from '@/shared/infra/logger';

const app = express();
const server = new Server(app);
const webSocketHandler = container.resolve(WebSocketHandler);
webSocketHandler.initialize(server);

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  );
  next();
});
app.use(helmet());
app.use(express.json());
app.use(rateLimiter);
morganBody(app, {
  noColors: true,
  stream: log,
  // maxBodyLength: 15,
});
app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', '..', '..', 'tmp', 'uploads')),
);
app.use('/api/v1', v1Router);
app.use('*', (request, response) => {
  return response.status(404).json({
    status: 'error',
    message: 'Not Found',
  });
});
app.use(
  (
    err: any,
    request: Request,
    response: Response,
    _next: NextFunction,
  ): Response => {
    if (errors(err)) {
      return response.status(404).json({
        status: 'error',
        message: err.joi.message,
      });
    }

    if (err instanceof multer.MulterError) {
      return response.status(400).json({
        status: 'error',
        message: err.message,
      });
    }

    console.log('[App Error]: Internal server error');
    console.error(err);

    return response.status(500).json({
      status: 'error',
      message: 'An unexpected error occurred.',
    });
  },
);

const port = process.env.PORT || 3333;

server.listen(port);
console.log(`[App]: Listening on port ${port}`);
