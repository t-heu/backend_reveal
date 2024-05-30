import { container } from 'tsyringe';

import LikeRepository from '@/modules/feed/infra/repos/typeorm/likeRepository';
import { ILikeRepository } from '@/modules/feed/domain/repos/ILikeRepo';

import CommentRepository from '@/modules/feed/infra/repos/typeorm/commentRepository';
import { ICommentRepository } from '@/modules/feed/domain/repos/ICommentRepo';

import PostRepository from '@/modules/feed/infra/repos/typeorm/postRepository';
import { IPostRepository } from '@/modules/feed/domain/repos/IPostRepo';

import HidePostRepository from '@/modules/feed/infra/repos/typeorm/hidePostRepository';
import { IHidePostRepository } from '@/modules/feed/domain/repos/IHidePostRepo';

import UserRepository from '@/modules/users/infra/repos/typeorm/userRepository';
import { IUserRepository } from '@/modules/users/domain/repos/IUserRepo';

import TokensRepository from '@/modules/users/infra/repos/typeorm/tokensRepository';
import { ITokensRepository } from '@/modules/users/domain/repos/ITokensRepo';

import ExternalAuthRepository from '@/modules/users/infra/repos/typeorm/externalAuthRepository';
import { IExternalAuthRepository } from '@/modules/users/domain/repos/IExternalAuthRepo';

import NotificationRepository from '@/modules/notification/infra/repos/typeorm/notificationRepo';
import { INotificationRepository } from '@/modules/notification/domain/repos/INotification';

import PushNotificationTokenRepository from '@/modules/notification/infra/repos/typeorm/pushNotificationTokenRepo';
import { IPushNotificationTokenRepository } from '@/modules/notification/domain/repos/IPushNotificationToken';

import { RabbitMQHandler } from '@/shared/infra/rabbitmq/rabbitMQHandler';
import { WebSocketHandler } from '@/shared/infra/ws/webSocketHandler';

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
