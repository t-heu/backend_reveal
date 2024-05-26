import { container } from 'tsyringe';

import LikeRepository from '../../modules/feed/repos/impl/typeorm/likeRepository';
import { ILikeRepository } from '../../modules/feed/repos/ILikeRepo';

import CommentRepository from '../../modules/feed/repos/impl/typeorm/commentRepository';
import { ICommentRepository } from '../../modules/feed/repos/ICommentRepo';

import PostRepository from '../../modules/feed/repos/impl/typeorm/postRepository';
import { IPostRepository } from '../../modules/feed/repos/IPostRepo';

import HidePostRepository from '../../modules/feed/repos/impl/typeorm/hidePostRepository';
import { IHidePostRepository } from '../../modules/feed/repos/IHidePostRepo';

import UserRepository from '../../modules/users/repos/impl/typeorm/userRepository';
import { IUserRepository } from '../../modules/users/repos/IUserRepo';

import TokensRepository from '../../modules/users/repos/impl/typeorm/tokensRepository';
import { ITokensRepository } from '../../modules/users/repos/ITokensRepo';

import ExternalAuthRepository from '../../modules/users/repos/impl/typeorm/externalAuthRepository';
import { IExternalAuthRepository } from '../../modules/users/repos/IExternalAuthRepo';

import NotificationRepository from '../../modules/notification/repos/impl/typeorm/notificationRepo';
import { INotificationRepository } from '../../modules/notification/repos/INotification';

import PushNotificationTokenRepository from '../../modules/notification/repos/impl/typeorm/pushNotificationTokenRepo';
import { IPushNotificationTokenRepository } from '../../modules/notification/repos/IPushNotificationToken';

import { RabbitMQHandler } from './rabbitmq/rabbitMQHandler';
import { WebSocketHandler } from './ws/webSocketHandler';

// Repositors
container.registerSingleton<ILikeRepository>('LikeRepository', LikeRepository);

container.registerSingleton<ICommentRepository>(
  'CommentRepository',
  CommentRepository,
);

container.registerSingleton<IPostRepository>('PostRepository', PostRepository);
container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IExternalAuthRepository>(
  'ExternalAuthRepository',
  ExternalAuthRepository,
);

container.registerSingleton<ITokensRepository>(
  'TokensRepository',
  TokensRepository,
);

container.registerSingleton<IHidePostRepository>(
  'HidePostRepository',
  HidePostRepository,
);

container.registerSingleton<INotificationRepository>(
  'NotificationRepository',
  NotificationRepository,
);

container.registerSingleton<IPushNotificationTokenRepository>(
  'PushNotificationTokenRepository',
  PushNotificationTokenRepository,
);

// Providers
container.registerSingleton<RabbitMQHandler>(
  'RabbitMQHandler',
  RabbitMQHandler,
);

container.registerSingleton<WebSocketHandler>(
  'WebSocketHandler',
  WebSocketHandler,
);
