import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  AfterInsert,
} from 'typeorm';

import { DomainEvents } from '@/shared/domain/events/domainEvents';
import { UniqueEntityID } from '@/shared/domain/uniqueEntityID';

import Post from '@/shared/infra/database/typeorm/entity/Post';
import Comment from '@/shared/infra/database/typeorm/entity/Comment';
import HidePost from '@/shared/infra/database/typeorm/entity/HidePost';
import Like from '@/shared/infra/database/typeorm/entity/Like';
import Token from '@/shared/infra/database/typeorm/entity/Token';
import ExternalAuth from '@/shared/infra/database/typeorm/entity/ExternalAuth';
import Notification from '@/shared/infra/database/typeorm/entity/Notification';
import PushNotificationToken from '@/shared/infra/database/typeorm/entity/PushNotificationToken';

@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: false })
  enabled: boolean;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  password: string;

  @Column({ default: '' })
  photo: string;

  @Column({ default: '' })
  locale: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Post, posts => posts.user)
  posts: Post[];

  @OneToMany(() => Notification, notifications => notifications.user)
  notification: Notification[];

  @OneToMany(() => Comment, comments => comments.user)
  comments: Comment[];

  @OneToMany(() => Like, likes => likes.user)
  likes: Like[];

  @OneToMany(() => HidePost, block => block.user)
  hide_posts: HidePost[];

  @OneToMany(() => Token, token => token.user)
  tokens: Token[];

  @OneToMany(() => ExternalAuth, profile => profile.user)
  external_auths: ExternalAuth[];

  @OneToMany(() => PushNotificationToken, key => key.user)
  notification_keys: PushNotificationToken[];

  @AfterInsert()
  dispatchAggregateEvents(): void {
    const aggregateId = new UniqueEntityID(this.id);
    DomainEvents.dispatchEventsForAggregate(aggregateId);
  }
}
