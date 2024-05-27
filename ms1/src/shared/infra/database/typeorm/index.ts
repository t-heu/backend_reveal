import { config } from 'dotenv';

import {
  createConnection,
  getConnectionOptions,
  Connection,
  ConnectionOptions,
} from 'typeorm';

import HidePost from '@/shared/infra/database/typeorm/entity/HidePost';
import Comment from '@/shared/infra/database/typeorm/entity/Comment';
import Like from '@/shared/infra/database/typeorm/entity/Like';
import Post from '@/shared/infra/database/typeorm/entity/Post';
import User from '@/shared/infra/database/typeorm/entity/User';
import ExternalAuth from '@/shared/infra/database/typeorm/entity/ExternalAuth';
import Token from '@/shared/infra/database/typeorm/entity/Token';
import Notification from '@/shared/infra/database/typeorm/entity/Notification';
import PushNotificationToken from '@/shared/infra/database/typeorm/entity/PushNotificationToken';

config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const entities = [
  User,
  HidePost,
  Comment,
  Like,
  Post,
  ExternalAuth,
  Token,
  Notification,
  PushNotificationToken,
];

const optionsPostgress: ConnectionOptions = {
  type: 'postgres',
  entities,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as number | undefined,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
};

const options = optionsPostgress;

export default async (): Promise<Connection | any> => {
  try {
    const defaultOptions = await getConnectionOptions();

    return createConnection(Object.assign(defaultOptions, options));
  } catch (error) {
    return error;
  }
};
